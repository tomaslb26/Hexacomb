package com.example.todoapp.config;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.entities.Member;
import net.dv8tion.jda.api.requests.GatewayIntent;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.CompletableFuture;

@Configuration
public class DiscordBotConfig {

    @Value("${discord.bot.token}")
    private String discordToken;

    private JDA jda;

    @Bean
    public JDA discordJDABuilder() throws InterruptedException {
        JDABuilder jdaBuilder = JDABuilder.createDefault(discordToken).enableIntents(GatewayIntent.GUILD_MEMBERS);
        jda = jdaBuilder.build().awaitReady();
        return jda;
    }

    public CompletableFuture<Member> isUserInServer(String username) {
        CompletableFuture<Member> result = new CompletableFuture<>();

        Guild guild = jda.getGuildById("803135919792193537");

        guild.loadMembers().onSuccess(members -> {
            for (Member member : members) {
                try {
                    
                    String discordMember = member.getUser().getName();
                    if (discordMember.equals(username)) {
                        result.complete(member);
                        return;
                    }

                } catch (Exception e) {
                    System.out.println("Error: " + e.getMessage());
                }
            }
            result.complete(null); // If the loop completes without finding a match
        });

        return result;
    }

    public CompletableFuture<Boolean> sendDMByID(String id, String code) {
        CompletableFuture<Boolean> result = new CompletableFuture<>();

        Guild guild = jda.getGuildById("803135919792193537");

        if (guild != null) {
            guild.loadMembers().onSuccess(members -> {
                for (Member member : members) {
                    try {
                        // Use member.getId() to get the member's ID
                        String discordMemberId = member.getId();

                        // Use equals to compare strings
                        if (discordMemberId.equals(id)) {
                            member.getUser().openPrivateChannel().queue(privateChannel ->
                                privateChannel.sendMessage("Hello, " + member.getUser().getAsMention() + "! Your code is: " + code).queue()
                            );
                            result.complete(true);
                            return;
                        }
                    } catch (Exception e) {
                        System.out.println("Error: " + e.getMessage());
                    }
                }
                result.complete(false); // If the loop completes without finding a match
            });
        } else {
            // Handle the case where the guild is not found
            result.completeExceptionally(new IllegalArgumentException("Guild not found"));
        }

        return result;
    }

    public void SendMessageInChannel(String message) {
        Guild guild = jda.getGuildById("803135919792193537");
        guild.getTextChannelById("1174772174414958612").sendMessage(message).queue();
    }


}