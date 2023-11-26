package com.example.todoapp.model.Submission;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import com.example.todoapp.model.ItemSale;
import com.example.todoapp.model.SubmissionType;
import org.hibernate.annotations.Type;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
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
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private UUID id;
    private UUID userId;
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
    @Enumerated
    private SubmissionType type;
    @Enumerated
    private SubmissionStatus status;
    private LocalDate createdAt;
}
