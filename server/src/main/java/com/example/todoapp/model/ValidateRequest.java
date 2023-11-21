package com.example.todoapp.model;

public class ValidateRequest {
    

    private String username;
    private String verificationCode;

    public ValidateRequest() {
    }

    public ValidateRequest(String username, String verificationCode) {
        this.username = username;
        this.verificationCode = verificationCode;
    }

    public String getUsername() {
        return username;
    }

    public String getVerificationCode() {
        return verificationCode;
    }
}
