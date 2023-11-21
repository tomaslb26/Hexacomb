package com.example.todoapp.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.entities.User;
import net.dv8tion.jda.api.entities.Guild; // Import the correct Guild class
import net.dv8tion.jda.api.entities.Member;
import net.dv8tion.jda.api.entities.channel.middleman.MessageChannel;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

public class SendMessage extends ListenerAdapter {

    private String guildId = "803135919792193537";

    private JDA jda;

    public SendMessage(JDA jda) {
        this.jda = jda;
    }

    private void sendDM(User user){
        if (!user.isBot()) {
            // Send a direct message to the user who sent the message
            user.openPrivateChannel().queue(privateChannel ->
                    privateChannel.sendMessage("Hello, " + user.getAsMention() + "! I received your message in the server.").queue()
            );
        }
    }
    

    private void listUsers() {

        System.out.println("Listing users in guild " + guildId);
        Guild guild = jda.getGuildById(guildId);

        System.out.println("Guild name: " + guild.getName());
        guild.loadMembers().onSuccess(members -> {
            for (Member member : members) {
                try {
                    System.out.println("Member: " + member.getEffectiveName() + "#" + member.getUser().getAsTag());
                    if(member.getEffectiveName().equals("Hardy")) {
                        sendDM(member.getUser());
                    }

                } catch (Exception e) {
                    System.out.println("Error: " + e.getMessage());
                }
            }
        });
    }



    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        // Retrieve the user who sent the message
        User user = event.getAuthor();

        // Retrieve the text channel where the message was received
        MessageChannel channel = event.getChannel();
        //System.out.println("Message received from " + user.getAsTag() + " in " + channel.getName() + ": " + event.getMessage().getContentDisplay());
        //listUsers();

        // Check if the message is not from a bot (to avoid an infinite loop)
        if (!user.isBot()) {
            // Send a direct message to the user who sent the message
            /*user.openPrivateChannel().queue(privateChannel ->
                    privateChannel.sendMessage("Hello, " + user.getAsMention() + "! I received your message in the server.").queue()
            );*/

            // Reply to the message in the same text channel
            channel.sendMessage("Pix actually thinks I care about here lmao").queue();
        }
    }
    
}