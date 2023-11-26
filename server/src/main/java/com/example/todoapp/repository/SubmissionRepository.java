package com.example.todoapp.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.todoapp.model.User;
import com.example.todoapp.model.Submission.Submission;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, UUID> {
    
    @Query("SELECT u FROM Submission u WHERE u.userId = :userId")
    Optional<List<Submission>> findSubmissionsByUserId(UUID userId);

}
