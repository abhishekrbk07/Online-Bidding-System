package com.cotiviti.bid.service;

import java.util.List;

import com.cotiviti.bid.model.Product;
import com.cotiviti.bid.playload.ResponseProductDto;

public interface ProductService {
	
	Product addProduct(Product product);
	List<Product> getAllProducts();
	Product getById(int id);
	List<ResponseProductDto> getByUserId(int id);

	Product updateProduct(Product product);

	int countAllProducts();

	int countProductsByUserId(int userId);
}
