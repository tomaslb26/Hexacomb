package com.example.todoapp.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todoapp.config.DiscordBotConfig;
import com.example.todoapp.model.CodeRequest;
import com.example.todoapp.model.GetUserResponse;
import com.example.todoapp.model.User;
import com.example.todoapp.model.UserResponse;
import com.example.todoapp.service.UserService;


@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    private DiscordBotConfig discordBotConfig;

    @Autowired
    public UserController(UserService userService, DiscordBotConfig discordBotConfig) {
        this.userService = userService;
        this.discordBotConfig = discordBotConfig;
    }

    @GetMapping("/get")
    public ResponseEntity<GetUserResponse> getUser(@RequestHeader("Authorization") String bearerToken) {
        User user = userService.getUser(bearerToken.split("Bearer ")[1]);
        GetUserResponse response = GetUserResponse.builder()
                .username(user.getUsername())
                .discord(user.getDiscord())
                .role(user.getRole())
                .isVerified(user.isVerified())
                .id(user.getId())
                .avatarUrl(user.getAvatarUrl())
                .build();
        return ResponseEntity.ok(response);
    }

    private static String generateRandomCode() {
        Random random = new Random();
        int code = 1000 + random.nextInt(9000); // Generates a random number between 100000 and 999999
        return String.valueOf(code);
    }

    @PostMapping("send_code")
    public ResponseEntity<UserResponse> sendCode(@RequestBody CodeRequest request) {
        UserResponse response = new UserResponse();
        User user = userService.getUserByUsername(request.getUsername());
        String code = generateRandomCode();
        Boolean sent = discordBotConfig.sendDMByID(user.getDiscordId(), code).join();
        if(sent){
            response = userService.changeCode(user, code);
        }
        else{
            response = UserResponse.builder()
                    .success(false)
                    .message("User not found")
                    .build();
        }


        return ResponseEntity.ok(response);
    }

    @PostMapping("verify")
    public ResponseEntity<UserResponse> verifyUser(@RequestBody CodeRequest request) {
        UserResponse response = new UserResponse();
        User user = userService.getUserByUsername(request.getUsername());
        if(user != null){
            userService.verifyUser(user, request.getCode());
            response = UserResponse.builder()
                    .success(true)
                    .message("User verified")
                    .build();
        }
        else{
            response = UserResponse.builder()
                    .success(false)
                    .message("No user found")
                    .build();
        }
        return ResponseEntity.ok(response);
    }

    
}
