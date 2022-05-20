package com.cotiviti.bid.model;

import com.cotiviti.bid.model.Role;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
public class ResponseLoginDto {
    String username;
    int userId;
    private Set<Role> role = new HashSet<>();
    public String getUsername() {
        return username;
    }

    public int getId() {
        return userId;
    }

    public void setId(int userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public Set<Role> getRole() {
        return role;
    }
    public void setRole(Set<Role> role) {
        this.role = role;
    }
}