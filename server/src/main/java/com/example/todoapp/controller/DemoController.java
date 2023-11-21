package com.example.todoapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo")
public class DemoController {

    
    @GetMapping
    public ResponseEntity demo() {
        return ResponseEntity.ok(new JSONObject().put("message", "Hello World").toString());
    }
}
