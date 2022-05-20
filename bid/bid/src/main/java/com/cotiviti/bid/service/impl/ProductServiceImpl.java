package com.cotiviti.bid.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.cotiviti.bid.playload.ResponseProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cotiviti.bid.model.Product;
import com.cotiviti.bid.repo.ProductRepo;
import com.cotiviti.bid.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	
	private ProductRepo productRepo;
	

	@Autowired
	public ProductServiceImpl(ProductRepo productRepo) {
		super();
		this.productRepo = productRepo;
	}

	@Override
	public Product addProduct(Product product) {
		// TODO Auto-generated method stub
		return productRepo.save(product);
	}

	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		return productRepo.findAll();
	}

	@Override
	public Product getById(int id) {
		// TODO Auto-generated method stub
		return productRepo.getById(id);
	}

	@Override
	public List<ResponseProductDto> getByUserId(int id) {
		List<Product> allProducts= productRepo.findAll();
		List<Product> allProductsByUserId = new ArrayList<>();
		List<ResponseProductDto> requiredList = new ArrayList<>();
		for(Product item : allProducts){
			if(item.getUser().getId() == id){
				ResponseProductDto responseProductDto = new ResponseProductDto();
				responseProductDto.setId(item.getId());
				responseProductDto.setUsername(item.getUser().getUsername());
				responseProductDto.setUserId(item.getUser().getId());
				responseProductDto.setProductName(item.getProductName());
				responseProductDto.setProductDescription(item.getDescription());
				responseProductDto.setPrice(item.getPrice());
				requiredList.add(responseProductDto);
				allProductsByUserId.add(item);
			}
		}
		if(requiredList.size()!=0){
			return requiredList;
		}
		else{
			return null;
		}
	}

	@Override
	public Product updateProduct(Product product) {
		return productRepo.save(product);
	}
	@Override
	public int countAllProducts(){
		List<Product> allProducts = productRepo.findAll();
		int productCount = 0;
		for(Product item : allProducts ){
			productCount++;
		}
		return productCount;
	}
	@Override
	public int countProductsByUserId(int userId){
		List<ResponseProductDto> allProducts = getByUserId(userId);
		int productCount = 0;
		for(ResponseProductDto item : allProducts ){
			productCount++;
		}
		return productCount;
	}
}

