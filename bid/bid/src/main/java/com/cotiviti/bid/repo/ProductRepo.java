package com.cotiviti.bid.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cotiviti.bid.model.Product;

public interface ProductRepo extends JpaRepository<Product, Integer> {

}
