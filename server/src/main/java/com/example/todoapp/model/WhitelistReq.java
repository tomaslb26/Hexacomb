package com.example.todoapp.model;

import java.util.List;
import java.util.UUID;

import javax.swing.plaf.synth.Region;

import org.hibernate.annotations.GenericGenerator;

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
}
