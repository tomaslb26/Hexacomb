package com.example.todoapp.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.todoapp.model.User;
import com.example.todoapp.model.UserResponse;
import com.example.todoapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final JwtService jwtService;


    public User getUser(String token){

        String username = jwtService.extractUsername(token);
        return userRepository.findUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByUsername(String username){
        return userRepository.findUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserResponse changeCode(User user, String code){
        user.setVerificationCode(code);
        userRepository.save(user);
        return UserResponse.builder()
                .success(true)
                .message("Code changed")
                .build();
    }

    public UserResponse verifyUser(User user, String code){
        if(user.getVerificationCode().equals(code)){
            user.setVerified(true);
            userRepository.save(user);
            return UserResponse.builder()
                    .success(true)
                    .message("User verified")
                    .build();
        }
        else{
            return UserResponse.builder()
                    .success(false)
                    .message("Wrong code")
                    .build();
        }
    }
}
