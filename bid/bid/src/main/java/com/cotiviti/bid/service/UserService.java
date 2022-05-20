package com.cotiviti.bid.service;

import java.util.List;

import com.cotiviti.bid.model.User;

public interface UserService {
	
	 User saveUser(User user);
	 List<User> getAllUser();
	 void deleteUser(int id);
	 User findById(int id);
	

}
