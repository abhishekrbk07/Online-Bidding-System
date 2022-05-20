package com.cotiviti.bid.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cotiviti.bid.model.Role;

public interface RoleRepo extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
}
