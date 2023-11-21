package com.example.todoapp.model;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "\"users\"")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Integer id;
    private String discord;
    private String username;
    private String password;
    private String verificationCode;
    private boolean verified;
    private String discordId;
    public String avatarUrl;
    private LocalDate createdAt;
    @Enumerated
    private Role role;

    // Default constructor is important for JPA
    public User() {
        this.createdAt = LocalDate.now();
        this.verified = false;
    }

    // Other constructor for creating a user with provided details
    public User(String username, String password, String discord, String verificationCode, Role role, String discordId, String avatarUrl) {
        this(); // Calls the default constructor to set id and createdAt
        this.username = username;
        this.password = password;
        this.discord = discord;
        this.verificationCode = verificationCode;
        this.role = role;
        this.discordId = discordId;
        this.avatarUrl = avatarUrl;
    }

    // Getters, setters, and other methods...

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public String getDiscord() {
        return discord;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDiscord(String discord) {
        this.discord = discord;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public void setDiscordId(String discordId) {
        this.discordId = discordId;
    }


    public String getDiscordId() {
        return discordId;
    }
    

    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Integer getId() {
        return id;
    }

    public Role getRole() {
        return role;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
