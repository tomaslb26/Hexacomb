package com.example.todoapp.model.Response;

import java.util.List;

import com.example.todoapp.model.Submission.Submission;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionResponse {
    private boolean success;
    private String message;
    private Integer id;
    private List<Submission> submissions;
}
