package com.example.todoapp.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todoapp.config.DiscordBotConfig;
import com.example.todoapp.model.WhitelistReq;
import com.example.todoapp.model.Response.WhitelistResponse;
import com.example.todoapp.service.SignService;
import com.example.todoapp.service.WhitelistService;

import net.dv8tion.jda.api.entities.Member;

@RestController
@RequestMapping("/api/v1/whitelist")
public class WhitelistController {

    private final WhitelistService whitelistService;
    private DiscordBotConfig discordBotConfig;

    @Autowired
    public WhitelistController(WhitelistService whitelistService, DiscordBotConfig discordBotConfig) {
        this.whitelistService = whitelistService;
        this.discordBotConfig = discordBotConfig;
    }

    public boolean checkIfPreWhitelist(Member discordMember){
        for (net.dv8tion.jda.api.entities.Role roleMember : discordMember.getRoles()) {
            String roleName = roleMember.getName().toLowerCase();
            System.out.println(roleName);
            if(roleName.equals("pre-whitelisted")){
                return true;
            }

        }

        return false;
    }
    
    @PostMapping("/submit")
    public WhitelistResponse createWhitelistRequest(@RequestBody WhitelistReq request){
        WhitelistResponse response = new WhitelistResponse();
        Member isInServer = discordBotConfig.isUserInServer(request.getDiscordName()).join();

        if(isInServer == null){
            response.setSuccess(false);
            response.setMessage("User: " + request.getDiscordName() + " is not in the server!");
        }
        else{
            boolean isPreWhitelisted = checkIfPreWhitelist(isInServer);
            if(!isPreWhitelisted){
                response.setSuccess(false);
                response.setMessage("User: " + request.getDiscordName() + " is already whitelisted or muted.");
            }
            else{
                request.setDiscordId(isInServer.getId());
                response = whitelistService.createWhitelistRequest(request);
                if(response.isSuccess()){
                    discordBotConfig.PostWhitelistRequest(isInServer.getUser().getAsMention() + " has just sent a whitelist request! Use !see " + request.getDiscordName() + " to see the request.");
                }
            }
        }
        
        return response;
    }

    @DeleteMapping("/delete/{discordName}")
    public WhitelistResponse deleteWhitelistRequest(
        @PathVariable("discordName") String discordName
    ){
        WhitelistResponse response = new WhitelistResponse();
        response = whitelistService.deleteWhitelistRequest(discordName);
        return response;
    }
}
