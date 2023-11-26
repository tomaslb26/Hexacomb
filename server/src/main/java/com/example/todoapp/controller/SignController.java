package com.example.todoapp.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

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
import com.example.todoapp.model.Request.ResetRequest;
import com.example.todoapp.service.SignService;
import com.example.todoapp.service.UserService;

import net.dv8tion.jda.api.entities.Member;
import net.dv8tion.jda.api.entities.User;

@RestController
@RequestMapping("/api/v1/auth")
public class SignController {

    private final SignService signService;
    private DiscordBotConfig discordBotConfig;
    private UserService userService;

    @Autowired
    public SignController(SignService signService, DiscordBotConfig discordBotConfig, UserService userService) {
        this.signService = signService;
        this.userService = userService;
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

    public void sendRecoveryLink(Member member, String discordUsername, String message, String username){
        User user = member.getUser();
        if (!user.isBot()) {
            // Send a direct message to the user who sent the message
            user.openPrivateChannel().queue(privateChannel ->
                    privateChannel.sendMessage("Hello, " + user.getAsMention() + "! Your recovery link is: https://www.hexacomb.net/reset?id=" + message + "&username=" + username).queue()
            );
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
            Role role = getRole(isInServer);
            if(role == null){
                response.setMessage("You are not whitelisted!");
                response.setSuccess(false);
                ResponseEntity<SignResponse> responseEntity = ResponseEntity.ok(response);
                return responseEntity;
            }
            response = signService.addNewUser(request, role, isInServer.getId(), code, isInServer.getUser().getAvatarUrl());
            if(response.isSuccess()) sendDM(isInServer, request.getDiscord(), code);
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

    @PostMapping("/forgot")
    public ResponseEntity<SignResponse> forgotPassword(@RequestBody Map<String, String> body) {
        SignResponse response = new SignResponse();
        String username = body.get("username");
        com.example.todoapp.model.User user = userService.getUserByUsername(username);
    
        if (user == null) {
            response.setMessage("No user found in the server!");
            response.setSuccess(false);
        } 
        else {
            UUID uuid = UUID.randomUUID();
            String uuidAsString = uuid.toString();
            response = userService.setRecoveryCode(user, uuidAsString);
            if(response.isSuccess()){
                Member isInServer = discordBotConfig.isUserInServer(user.getDiscord()).join();
                if(isInServer != null){
                    sendRecoveryLink(isInServer, user.getDiscord(), uuidAsString, user.getUsername());
                }
            } 
        }
        
        ResponseEntity<SignResponse> responseEntity = ResponseEntity.ok(response);
        return responseEntity;
    }

    @PostMapping("/reset")
    public ResponseEntity<SignResponse> resetPassword(@RequestBody ResetRequest request) {
        SignResponse response = new SignResponse();
        com.example.todoapp.model.User user = userService.getUserByUsername(request.getUsername());
    
        if (user == null) {
            response.setMessage("No user found in the server!");
            response.setSuccess(false);
        } 
        else {
            response = signService.resetPassword(user, request.getRecoveryToken(), request.getPassword());
        }
        
        ResponseEntity<SignResponse> responseEntity = ResponseEntity.ok(response);
        return responseEntity;
    }

    
}
