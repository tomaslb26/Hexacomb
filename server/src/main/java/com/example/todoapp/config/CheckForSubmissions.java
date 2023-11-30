package com.example.todoapp.config;

import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.todoapp.model.WhitelistReq;
import com.example.todoapp.service.WhitelistService;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

public class CheckForSubmissions extends ListenerAdapter {

    private final WhitelistService whitelistService;
    private final JDA jda;

    public CheckForSubmissions(JDA jda, WhitelistService whitelistService) {
        this.jda = jda;
        this.whitelistService = whitelistService;
    }

    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        if(event.getChannel().getId().toString().equals("1179479860066930799") && event.getMessage().getContentDisplay().toString().startsWith("!see")){
            String[] message = event.getMessage().getContentDisplay().toString().split(" ");
            String discordUsername = message[1];
            WhitelistReq req = whitelistService.getWhitelistRequest(discordUsername);
            if(req != null){
                event.getChannel().sendMessage("```" + req.toString() + "```").queue();
            }
            else{
                event.getChannel().sendMessage("```No submission found for " + discordUsername + "```").queue();
            }
        }
    }
    
}