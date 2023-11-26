package com.example.todoapp.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.todoapp.model.LoginRequest;
import com.example.todoapp.model.Role;
import com.example.todoapp.model.SignRequest;
import com.example.todoapp.model.SignResponse;
import com.example.todoapp.model.User;
import com.example.todoapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class SignService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public SignResponse addNewUser(SignRequest request, Role role, String discordId,  String verificationCode, String avatarUrl){ 
        String encodedPassword = bCryptPasswordEncoder.encode(request.getPassword());
        Optional<User> userOptional = userRepository.findUserByUsername(request.getUsername());
        if(userOptional.isPresent()){
            return SignResponse
                    .builder()
                    .message("User already exists")
                    .success(false)
                    .build();
        }

        User user = new User(request.getUsername(), encodedPassword, request.getDiscord(), verificationCode, role, discordId, avatarUrl);
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return SignResponse
                .builder()
                .token(jwtToken)
                .message("User registered successfully.")
                .success(true)
                .build();
    }

    public SignResponse loginUser(LoginRequest request) throws RuntimeException{
        try{
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );

            

            User user = userRepository
                .findUserByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

            var jwtToken = jwtService.generateToken(user);
            return SignResponse
                    .builder()
                    .token(jwtToken)
                    .message("User logged in successfully.")
                    .success(true)
                    .build();
        }
        catch(AuthenticationException e){
            return SignResponse
                    .builder()
                    .message("Invalid username/password supplied")
                    .success(false)
                    .build();
        }
    }

    public SignResponse resetPassword(User user, UUID recoveryToken, String newPassword){
        if(user.getResetPasswordToken().equals(recoveryToken)){
            String encodedPassword = bCryptPasswordEncoder.encode(newPassword);
            user.setPassword(encodedPassword);
            userRepository.save(user);
            return SignResponse
                    .builder()
                    .message("Password changed successfully")
                    .success(true)
                    .build();
        }
        else{
            return SignResponse
                    .builder()
                    .message("Invalid recovery token")
                    .success(false)
                    .build();
        }
    }

    /*public SignResponse validateUser(ValidateRequest request){
        Optional<User> userOptional = userRepository.findUserByUsername(request.getUsername());
        if(userOptional.isPresent()){
            User user = userOptional.get();
            if(user.getVerificationCode().equals(request.getVerificationCode())){
                user.setVerified(true);
                userRepository.save(user);
                //return new SignResponse(true, "User verified successfully");
            }
            //return new SignResponse(false, "Invalid verification code");
        }
        //return new SignResponse(false, "User not found");
    }*/

}
