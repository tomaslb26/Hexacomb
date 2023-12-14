package com.example.todoapp.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.todoapp.model.User;
import com.example.todoapp.model.WhitelistReq;
import com.example.todoapp.model.WhitelistRequest.WhitelistStatus;

@Repository
public interface WhitelistRepository extends JpaRepository<WhitelistReq, UUID> {

    @Query("SELECT u FROM WhitelistReq u WHERE u.discordName = :discordName")
    Optional<WhitelistReq> findSubmissionByDiscord(String discordName);

    @Query("SELECT u FROM WhitelistReq u WHERE u.status = :status")
    Optional<List<WhitelistReq>> findPendingSubmissions(@Param("status") WhitelistStatus status);
}
