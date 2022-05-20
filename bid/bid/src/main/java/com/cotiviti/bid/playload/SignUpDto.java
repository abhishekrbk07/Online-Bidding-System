package com.cotiviti.bid.playload;

import java.util.Set;

import com.cotiviti.bid.model.Role;

public class SignUpDto {
	
	
	private String name;
    private String username;
    private Set<Role> roles;
  
  
    private String password;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}



	
	
    
    

}
