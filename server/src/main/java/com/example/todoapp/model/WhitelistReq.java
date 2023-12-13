package com.example.todoapp.model;

import java.util.List;
import java.util.UUID;


import org.hibernate.annotations.GenericGenerator;

import com.example.todoapp.model.WhitelistRequest.Region;
import com.example.todoapp.model.WhitelistRequest.WhitelistStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "\"whitelist_requests\"")
public class WhitelistReq {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private UUID id;

    private String discordName;
    private String discordId;
    private String howDidYouFindUs;
    @Enumerated
    private Region region;
    private boolean englishProefficiency;
    private String age;
    private String aboutYourself;
    private String experienceInMinecraft;
    private String mcName;
    private String whatDoYouLookFor;
    private String howWouldYouContribute;
    private String waysToDriveLifespan;
    private String contributeToEconomy;
    private String howToHandleConflict;
    private List<String> photos;
    private String haveYouBeenBanned;
    private String describeOutfite;

    @Enumerated
    private WhitelistStatus status;

    @Override
    public String toString(){
        return "**Discord Name:** " + "\n\n" + discordName + "\n\n" +
                "**How did you find out about Hexacomb SMP?** " + "\n\n" + howDidYouFindUs + "\n\n" +
                "**Region: **" + "\n\n" + region + "\n\n" +
                "**English Proefficiency: **" + "\n\n" + englishProefficiency + "\n\n" +
                "**Age: **" + "\n\n" + age + "\n\n" +
                "**Tell us about yourself *We would appreciate it if you can go into as much detail as possible with as much as you are willing to share- hobbies, interests, pets, etc!*: **" + "\n\n" + aboutYourself + "\n\n" +
                "**What Experience do you have playing Minecraft? **" + "\n\n" + experienceInMinecraft + "\n\n" +
                "**Minecraft Name: **" + "\n\n" + mcName + "\n\n" +
                "**What do you look for in a Minecraft Community & Server? **" + "\n\n" + whatDoYouLookFor + "\n\n" +
                "**In what ways are you looking to contribute to our Minecraft Community? **" + "\n\n" + howWouldYouContribute + "\n\n" +
                "**Story & \"Player to Player\" interaction is what pushes a SMP forward. In what ways do you think you can drive the lifespan of the server further based on the way you intend on contributing to the community?**" + "\n\n" + waysToDriveLifespan + "\n\n" +
                "**In an economy-based server, how would you contribute to the in-game economy and trade with other players?**" + "\n\n" + contributeToEconomy + "\n\n" +
                "**How do you go about handling conflict on a server? This includes drama outside the server or rule breaks by other players such as unsolicited PvP & Grief.**" + "\n\n" + howToHandleConflict + "\n\n" +
                "**Photos: **" + "\n\n" + photos + "\n\n" +
                "**Have you ever been banned from any Minecraft Servers in the past? If so, why?**" + "\n\n" + haveYouBeenBanned + "\n\n" +
                "**Imagine you're hosting a \"Minecraft Fashion Show\" on the server, and the theme is \"Mobs in Formal Wear.\" You have to dress up one of the hostile mobs in the most hilarious and stylish formal outfit you can think of. Describe the outfit in detail and explain why you think it would win the fashion show.**" + "\n\n" + describeOutfite + "\n\n";
    }
}
