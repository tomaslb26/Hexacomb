package com.example.todoapp.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todoapp.config.DiscordBotConfig;
import com.example.todoapp.model.LoginRequest;
import com.example.todoapp.model.Role;
import com.example.todoapp.model.SignRequest;
import com.example.todoapp.model.SignResponse;
import com.example.todoapp.service.SignService;
import net.dv8tion.jda.api.entities.Member;
import net.dv8tion.jda.api.entities.User;

@RestController
@RequestMapping("/api/v1/auth")
public class SignController {

    private final SignService signService;
    private DiscordBotConfig discordBotConfig;

    @Autowired
    public SignController(SignService signService, DiscordBotConfig discordBotConfig) {
        this.signService = signService;
        this.discordBotConfig = discordBotConfig;
    }


    public void sendDM(Member member, String discordUsername, String message){
        User user = member.getUser();
        if (!user.isBot()) {
            // Send a direct message to the user who sent the message
            user.openPrivateChannel().queue(privateChannel ->
                    privateChannel.sendMessage("Hello, " + user.getAsMention() + "! Your code is: " + message).queue()
            );

            // Send a message to the channel that the message was sent in
            discordBotConfig.SendMessageInChannel("User: " + user.getAsMention() + " has just signed up!");
        }


    }

    public Role getRole(Member member){
        Role role = null;
        for (net.dv8tion.jda.api.entities.Role roleMember : member.getRoles()) {
            String roleName = roleMember.getName().toLowerCase();

            if(roleName.equals("pre-whitelisted")){
                return null;
            }
            
            // Check if the role name is Admin, 5 Head, or Tech Support
            if (roleName.equals("admin") || roleName.equals("5 heads") || roleName.equals("tech support")) {
                role = Role.ADMIN;
            }
            else if(roleName.equals("trusted") && role != Role.ADMIN){
                role = Role.TRUSTED;
            }
            else if(role != Role.ADMIN && role != Role.TRUSTED){
                role = Role.USER;
            }
        }

        return role;
    }

    private static String generateRandomCode() {
        Random random = new Random();
        int code = 1000 + random.nextInt(9000); // Generates a random number between 100000 and 999999
        return String.valueOf(code);
    }


    @PostMapping("/register")
    public ResponseEntity<SignResponse> registerNewUser(@RequestBody SignRequest request) {
        SignResponse response = new SignResponse();
        // Asynchronously check if the user is in the server
        Member isInServer = discordBotConfig.isUserInServer(request.getDiscord()).join();
    
        if (isInServer == null) {
            response.setMessage("No user found in the server!");
            response.setSuccess(false);
        } 
        else {
            String code = generateRandomCode();
            sendDM(isInServer, request.getDiscord(), code);
            Role role = getRole(isInServer);
            if(role == null){
                response.setMessage("You are not whitelisted!");
                response.setSuccess(false);
                ResponseEntity<SignResponse> responseEntity = ResponseEntity.ok(response);
                return responseEntity;
            }
            response = signService.addNewUser(request, role, isInServer.getId(), code, isInServer.getUser().getAvatarUrl());
        }
        
        ResponseEntity<SignResponse> responseEntity = ResponseEntity.ok(response);
        return responseEntity;
    }
    
    @PostMapping("/authenticate")
    public ResponseEntity<SignResponse> loginUser(@RequestBody LoginRequest request) {
        SignResponse response = new SignResponse();
        response = signService.loginUser(request);
        ResponseEntity<SignResponse> responseEntity = ResponseEntity.ok(response);
        return responseEntity;
    }

    
}
