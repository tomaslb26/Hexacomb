package com.example.todoapp.model.Request;


import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResetRequest {
    private String username;
    private UUID recoveryToken;
    private String password;
}
