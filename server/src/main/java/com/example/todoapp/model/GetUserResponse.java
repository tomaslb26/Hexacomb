package com.example.todoapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetUserResponse {
    private String username;
    private String discord;
    private Role role;
    private boolean isVerified;
    private int id;
    private String avatarUrl;
}
