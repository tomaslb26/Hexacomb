package com.example.todoapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.todoapp.model.WhitelistReq;
import com.example.todoapp.model.Response.WhitelistResponse;
import com.example.todoapp.model.WhitelistRequest.WhitelistStatus;
import com.example.todoapp.repository.UserRepository;
import com.example.todoapp.repository.WhitelistRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WhitelistService {

    private final WhitelistRepository whitelistRepository;

    public WhitelistResponse createWhitelistRequest(WhitelistReq request){

        Optional<WhitelistReq> submission = whitelistRepository.findSubmissionByDiscord(request.getDiscordName());

        if(submission.isPresent()){
            return WhitelistResponse.builder()
                    .success(false)
                    .message("You already have a whitelist request!")
                    .build();
        }
        else{
            WhitelistStatus status = WhitelistStatus.PENDING;
            request.setStatus(status);
            whitelistRepository.save(request);
        }

        return WhitelistResponse.builder()
                .success(true)
                .message("Whitelist request created")
                .build();
    }

    public WhitelistResponse deleteWhitelistRequest(String discordName){
            
            Optional<WhitelistReq> submission = whitelistRepository.findSubmissionByDiscord(discordName);
    
            if(submission.isPresent()){
                whitelistRepository.delete(submission.get());
            }
            else{
                return WhitelistResponse.builder()
                        .success(false)
                        .message("You don't have a whitelist request!")
                        .build();
            }
    
            return WhitelistResponse.builder()
                    .success(true)
                    .message("Whitelist request deleted")
                    .build();
    }

    public WhitelistReq getWhitelistRequest(String discordName){
        Optional<WhitelistReq> submission = whitelistRepository.findSubmissionByDiscord(discordName);

        if(submission.isPresent() && submission.get().getStatus() == WhitelistStatus.PENDING){
            return submission.get();
        }
        else{
            return null;
        }
    }

    public void updateWhitelistRequestById(String discordName, WhitelistStatus status){
        Optional<WhitelistReq> submission = whitelistRepository.findSubmissionByDiscord(discordName);

        if(submission.isPresent()){
            submission.get().setStatus(status);
            whitelistRepository.save(submission.get());
        }
    }

    public List<String> getAllWhitelistReqUsers(){
        Optional<List <WhitelistReq>> submissions = whitelistRepository.findPendingSubmissions(WhitelistStatus.PENDING);

        if(submissions.isPresent()){
            List<String> users = new ArrayList<String>();
            for(WhitelistReq submission : submissions.get()){
                users.add(submission.getDiscordName());
            }
            return users;
        }
        else{
            return null;
        }
    }
}
