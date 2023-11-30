package com.example.todoapp.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.todoapp.model.WhitelistReq;
import com.example.todoapp.model.Response.WhitelistResponse;
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

        if(submission.isPresent()){
            return submission.get();
        }
        else{
            return null;
        }
    }
}
