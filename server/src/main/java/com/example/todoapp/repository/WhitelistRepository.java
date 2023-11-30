package com.example.todoapp.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.todoapp.model.User;
import com.example.todoapp.model.WhitelistReq;

@Repository
public interface WhitelistRepository extends JpaRepository<WhitelistReq, UUID> {

    @Query("SELECT u FROM WhitelistReq u WHERE u.discordName = :discordName")
    Optional<WhitelistReq> findSubmissionByDiscord(String discordName);
}
