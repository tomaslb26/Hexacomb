package com.example.todoapp.model.Request;

import java.util.List;

import com.example.todoapp.model.ItemSale;
import com.example.todoapp.model.SubmissionType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionRequest {
    private String title;
    private String description;
    private List<ItemSale> items;
    private double x;
    private double y;
    private double z;
    private List<String> images;
    private String mcName;
    private String type;
}
