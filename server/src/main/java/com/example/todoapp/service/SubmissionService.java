package com.example.todoapp.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.todoapp.model.Role;
import com.example.todoapp.model.SubmissionType;
import com.example.todoapp.model.User;
import com.example.todoapp.model.Request.SubmissionRequest;
import com.example.todoapp.model.Response.SubmissionResponse;
import com.example.todoapp.model.Submission.Submission;
import com.example.todoapp.model.Submission.SubmissionStatus;
import com.example.todoapp.repository.SubmissionRepository;
import java.util.Optional;
import java.util.UUID;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository submissionRepository;

    public SubmissionResponse createSubmission(User user, SubmissionRequest submissionRequest){

        String statusUser = "";
        if(user.getRole() == Role.ADMIN || user.getRole() == Role.TRUSTED) statusUser = "ACCEPTED";
        else statusUser = "ON_HOLD";
        
        SubmissionStatus status = SubmissionStatus.valueOf(statusUser);
        SubmissionType type = SubmissionType.valueOf(submissionRequest.getType().toUpperCase());

        Submission submission = Submission.builder()
            .title(submissionRequest.getTitle())
            .description(submissionRequest.getDescription())
            .items(submissionRequest.getItems())
            .x(submissionRequest.getX())
            .y(submissionRequest.getY())
            .z(submissionRequest.getZ())
            .images(submissionRequest.getImages())
            .mcName(submissionRequest.getMcName())
            .type(type)
            .userId(user.getId())
            .status(status)
            .createdAt(LocalDate.now())
            .build();

        submissionRepository.save(submission);
        return  SubmissionResponse.builder()
            .success(true)
            .message("Submission created")
            .id(submission.getId())
            .build();
    } 

    public SubmissionResponse getSubmissions(){
        List<Submission> submissions = submissionRepository.findAll();
        return SubmissionResponse.builder()
            .success(true)
            .message("Submissions retrieved")
            .submissions(submissions)
            .build();
    }

    public SubmissionResponse getSubmissionsByUser(User user){
        Optional<List<Submission>> submissions = submissionRepository.findSubmissionsByUserId(user.getId());

        if(submissions.isEmpty()){
            return SubmissionResponse.builder()
                .success(false)
                .message("Submissions not found")
                .build();
        }else{
            return SubmissionResponse.builder()
                .success(true)
                .message("Submissions retrieved")
                .submissions(submissions.get())
                .build();
        }
    }
    
    public SubmissionResponse updateSubmission(SubmissionRequest submissionRequest, UUID id){
        Optional<Submission> submission = submissionRepository.findById(id);

        if(submission.isEmpty()){
            return SubmissionResponse.builder()
                .success(false)
                .message("Submission not found")
                .build();
        }else{
            SubmissionStatus status = SubmissionStatus.valueOf(submissionRequest.getStatus().toUpperCase());
            SubmissionType type = SubmissionType.valueOf(submissionRequest.getType().toUpperCase());

            submission.get().setTitle(submissionRequest.getTitle());
            submission.get().setDescription(submissionRequest.getDescription());
            submission.get().setItems(submissionRequest.getItems());
            submission.get().setX(submissionRequest.getX());
            submission.get().setY(submissionRequest.getY());
            submission.get().setZ(submissionRequest.getZ());
            submission.get().setImages(submissionRequest.getImages());
            submission.get().setMcName(submissionRequest.getMcName());
            submission.get().setType(type);
            submission.get().setStatus(status);

            submissionRepository.save(submission.get());
            return SubmissionResponse.builder()
                .success(true)
                .message("Submission updated")
                .id(submission.get().getId())
                .build();
        }
    }


    public SubmissionResponse deleteSubmission(UUID id){
        Optional<Submission> submission = submissionRepository.findById(id);

        if(submission.isEmpty()){
            return SubmissionResponse.builder()
                .success(false)
                .message("Submission not found")
                .build();
        }else{
            submissionRepository.delete(submission.get());
            return SubmissionResponse.builder()
                .success(true)
                .message("Submission deleted")
                .id(submission.get().getId())
                .build();
        }
    }
}
