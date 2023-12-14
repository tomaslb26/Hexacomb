package com.example.todoapp.config;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import com.example.todoapp.model.WhitelistReq;
import com.example.todoapp.model.WhitelistRequest.WhitelistStatus;
import com.example.todoapp.service.WhitelistService;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.entities.Member;
import net.dv8tion.jda.api.entities.Role;
import net.dv8tion.jda.api.entities.User;
import net.dv8tion.jda.api.events.Event;
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
        else if(event.getChannel().getId().toString().equals("1179479860066930799") && event.getMessage().getContentDisplay().toString().startsWith("!accept")){
            String[] message = event.getMessage().getContentDisplay().toString().split(" ");
            String discordUsername = message[1];

                whitelistService.updateWhitelistRequestById(discordUsername, WhitelistStatus.ACCEPTED);

                event.getGuild().loadMembers().onSuccess(members -> {

                    Member foundMember = members.stream()
                    .filter(member -> member.getUser().getName().equals(discordUsername))
                    .findFirst()
                    .orElse(null);
    
                    if (foundMember != null) {
                        List<Role> hexacombian = event.getGuild().getRolesByName("Hexacombian", true); // remove all roles named "pleb"
                        List<Role> whitelist = event.getGuild().getRolesByName("Pre-Whitelisted", true); // add all roles named "knight"

                        event.getGuild().modifyMemberRoles(foundMember,
                        hexacombian, whitelist).queue();
                        event.getChannel().sendMessage("```" + discordUsername + " has been accepted!```").queue();

                        User user = foundMember.getUser();
                        if (!user.isBot()) {
                            // Send a direct message to the user who sent the message
                            user.openPrivateChannel().queue(privateChannel ->
                                    privateChannel.sendMessage("You just got whitelisted! Welcome to Hexacomb!").queue()
                            );
                        }   
                    } else {
                        System.out.println("Member not found!");
                        event.getChannel().sendMessage("```Member not found: " + discordUsername + "```").queue();
                    }
                    // Complete the CompletableFuture to signal that the operation is done
                }).onError(error -> {
                    System.out.println("Error loading members: " + error.getMessage());
                });
                
            
        }
        else if(event.getChannel().getId().toString().equals("1179479860066930799") && event.getMessage().getContentDisplay().toString().startsWith("!deny")){
            String[] message = event.getMessage().getContentDisplay().toString().split(" ");
            String discordUsername = message[1];    
            String reason = String.join(" ", Arrays.copyOfRange(message, 2, message.length));

            
            whitelistService.deleteWhitelistRequest(discordUsername);

            event.getGuild().loadMembers().onSuccess(members -> {

                Member foundMember = members.stream()
                .filter(member -> member.getUser().getName().equals(discordUsername))
                .findFirst()
                .orElse(null);

                if (foundMember != null) {
                    User user = foundMember.getUser();
                    if (!user.isBot()) {
                        // Send a direct message to the user who sent the message
                        user.openPrivateChannel().queue(privateChannel ->
                                privateChannel.sendMessage("Your application was denied." + "\n" + "Reason: " + reason).queue()
                        );
                    }   
                } else {
                    System.out.println("Member not found!");
                    event.getChannel().sendMessage("```Member not found: " + discordUsername + "```").queue();
                }
                // Complete the CompletableFuture to signal that the operation is done
            }).onError(error -> {
                System.out.println("Error loading members: " + error.getMessage());
            });
        }
        else if(event.getChannel().getId().toString().equals("1179479860066930799") && event.getMessage().getContentDisplay().toString().startsWith("!list")){
            List<String> discordNames = whitelistService.getAllWhitelistReqUsers();

            if(discordNames.isEmpty() || discordNames == null){
                event.getChannel().sendMessage("```No pending submissions```").queue();
            }

            for(String discordName : discordNames){
                event.getChannel().sendMessage("```" + discordName + "```").queue();
            }
        }
        else if(event.getChannel().getId().toString().equals("1179479860066930799") && event.getMessage().getContentDisplay().toString().startsWith("!commands")){
            event.getChannel().sendMessage("```!see <discord username> - See a submission\n!accept <discord username> - Accept a submission\n!deny <discord username> <reason> - Deny a submission\n!list - List all pending submissions```").queue();
        }
    }
    
}