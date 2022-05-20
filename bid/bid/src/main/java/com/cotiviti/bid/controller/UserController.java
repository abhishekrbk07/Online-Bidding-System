package com.cotiviti.bid.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cotiviti.bid.model.User;
import com.cotiviti.bid.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}

	@PostMapping("/addUsers")
	public ResponseEntity<User> saveUser(@RequestBody User user) {
//		User saveUser = userService.saveUser(user);
		return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);

	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUser() {

		return new ResponseEntity<>(userService.getAllUser(), HttpStatus.OK);

	}

	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable("id") int id) {

		return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);

	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable("id") int id) {
		userService.deleteUser(id);
		return new ResponseEntity<>(HttpStatus.OK);

	}

}
