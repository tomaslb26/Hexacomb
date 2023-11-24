package com.example.todoapp.model.Submission;
import java.time.LocalDate;
import java.util.List;

import com.example.todoapp.model.ItemSale;
import com.example.todoapp.model.SubmissionType;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@Table(name = "\"submissions\"")
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer userId;
    private String title;
    @Column(length = 256)
    private String description;
    @ElementCollection
    private List<ItemSale> items;
    private double x;
    private double y;
    private double z;
    private List<String> images;
    private String mcName;
    private SubmissionType type;
    private SubmissionStatus status;
    private LocalDate createdAt;
}
