package com.cotiviti.bid.repo;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cotiviti.bid.model.User;

public interface UserRepo extends JpaRepository<User, Integer> {
	
//	Optional<User> findByUserName();
	Optional<User> findByUsername(String username);
	

}
