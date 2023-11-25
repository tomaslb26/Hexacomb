package com.example.todoapp.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todoapp.model.User;
import com.example.todoapp.model.Request.SubmissionRequest;
import com.example.todoapp.model.Response.SubmissionResponse;
import com.example.todoapp.service.SubmissionService;
import com.example.todoapp.service.UserService;

@RestController
@RequestMapping("/api/v1/submission")
public class SubmissionController {

    private SubmissionService submissionService;
    private UserService userService;

    @Autowired
    public SubmissionController(SubmissionService submissionService, UserService userService) {
        this.submissionService = submissionService;
        this.userService = userService;
    }
    
    @PostMapping("/create")
    public ResponseEntity<SubmissionResponse> createSubmission(
        @RequestHeader("Authorization") String bearerToken,
        @RequestBody SubmissionRequest submission
        ) {

        User user = userService.getUser(bearerToken.split("Bearer ")[1]);
        SubmissionResponse response = submissionService.createSubmission(user, submission);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/get")
    public ResponseEntity<SubmissionResponse> getSubmissions() {
        SubmissionResponse response = submissionService.getSubmissions();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/get")
    public ResponseEntity<SubmissionResponse> getSubmissionsByUser(
        @RequestBody Map<String, String> request
    ) {

        User user = userService.getUserByUsername(request.get("username"));
        SubmissionResponse response = submissionService.getSubmissionsByUser(user);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SubmissionResponse> updateSubmission(
        @RequestBody SubmissionRequest submission,
        @PathVariable("id") Integer id
    ) {
        SubmissionResponse response = submissionService.updateSubmission(submission, id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<SubmissionResponse> deleteSubmission(
        @PathVariable("id") Integer id
    ) {
        SubmissionResponse response = submissionService.deleteSubmission(id);
        return ResponseEntity.ok(response);
    }
}
