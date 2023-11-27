package com.example.todoapp.controller;

import java.util.Map;
import java.util.UUID;

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

import com.example.todoapp.config.DiscordBotConfig;
import com.example.todoapp.model.User;
import com.example.todoapp.model.Request.SubmissionRequest;
import com.example.todoapp.model.Response.SubmissionResponse;
import com.example.todoapp.service.SubmissionService;
import com.example.todoapp.service.UserService;

import net.dv8tion.jda.api.entities.Member;

@RestController
@RequestMapping("/api/v1/submission")
public class SubmissionController {

    private SubmissionService submissionService;
    private UserService userService;
    private DiscordBotConfig discordBotConfig;

    @Autowired
    public SubmissionController(SubmissionService submissionService, UserService userService, DiscordBotConfig discordBotConfig) {
        this.submissionService = submissionService;
        this.userService = userService;
        this.discordBotConfig = discordBotConfig;
    }

    public void postSubmission(User user){
        Member isInServer = discordBotConfig.isUserInServer(user.getDiscord()).join();
        System.out.println("User: " + user.getUsername() + " has just created a new submission!");
        discordBotConfig.PostSubmission("User: " + isInServer.getUser().getAsMention() + " has just created a new submission!");
    }
    
    @PostMapping("/create")
    public ResponseEntity<SubmissionResponse> createSubmission(
        @RequestHeader("Authorization") String bearerToken,
        @RequestBody SubmissionRequest submission
        ) {

        User user = userService.getUser(bearerToken.split("Bearer ")[1]);
        SubmissionResponse response = submissionService.createSubmission(user, submission);
        if(response.isSuccess()) postSubmission(user);

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
        @PathVariable("id") UUID id
    ) {
        SubmissionResponse response = submissionService.updateSubmission(submission, id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<SubmissionResponse> deleteSubmission(
        @PathVariable("id") UUID id
    ) {
        SubmissionResponse response = submissionService.deleteSubmission(id);
        return ResponseEntity.ok(response);
    }
}
