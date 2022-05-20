package com.cotiviti.bid.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cotiviti.bid.model.User;
import com.cotiviti.bid.repo.UserRepo;
import com.cotiviti.bid.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	private UserRepo userRepo;

	@Autowired
	public UserServiceImpl(UserRepo userRepo) {
		super();
		this.userRepo = userRepo;
	}

	@Override
	public User saveUser(User user) {
		// TODO Auto-generated method stub
		return userRepo.save(user);
	}

	@Override
	public List<User> getAllUser() {
		// TODO Auto-generated method stub
		return userRepo.findAll();
	}

	@Override
	public void deleteUser(int id) {
		userRepo.deleteById(id);
		
	}

	@Override
	public User findById(int id) {
		// TODO Auto-generated method stub
		return userRepo.findById(id).get();
	}
	
	
	
	
	

}
