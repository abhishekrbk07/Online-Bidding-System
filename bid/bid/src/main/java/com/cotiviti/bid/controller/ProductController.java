package com.cotiviti.bid.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cotiviti.bid.model.Bid;
import com.cotiviti.bid.playload.ResponseProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cotiviti.bid.model.Product;
import com.cotiviti.bid.model.User;

import com.cotiviti.bid.repo.UserRepo;
import com.cotiviti.bid.service.ProductService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ProductController {

    private UserRepo userRepo;
    private ProductService productService;

    @Autowired
    public ProductController(UserRepo userRepo, ProductService productService) {
        super();
        this.userRepo = userRepo;
        this.productService = productService;
    }


    @PostMapping("/add-product/{userId}")
    public ResponseEntity<Product> saveProduct(@PathVariable("userId") int userId, @RequestBody Product product) {
        User user = userRepo.findById(userId).get();
        product.setUser(user);
        Product newProduct = productService.addProduct(product);
        return new ResponseEntity<Product>(newProduct, HttpStatus.CREATED);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getSingleProduct(@PathVariable("id") Integer id) throws Exception {
        return new ResponseEntity<Product>(productService.getById(id), HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> allProducts = productService.getAllProducts();
        return new ResponseEntity<>(allProducts, HttpStatus.OK);

    }

    @GetMapping("/productsbyuser/{userId}")
    public ResponseEntity<?> getBidsByUserId(@PathVariable("userId") int userId) {
        List<ResponseProductDto> responseProductDtos = productService.getByUserId(userId);
        if(responseProductDtos != null) {
            return new ResponseEntity<>(productService.getByUserId(userId), HttpStatus.OK);
        }else{
            return new ResponseEntity<>("User ID is INVALID!!", HttpStatus.BAD_REQUEST);
        }

    }
    @GetMapping("/countallproducts")
    public ResponseEntity<?> countAllBids(){
        int allProducts = productService.countAllProducts();
        Map<String, Integer> map = new HashMap<>();
        map.put("allProducts", allProducts);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
    @GetMapping("/countuserproducts/{userId}")
    public ResponseEntity<?> countUserBids(@PathVariable("userId") int userId){
        int userProducts = productService.countProductsByUserId(userId);
        Map<String, Integer> map = new HashMap<>();
        map.put("allProducts", userProducts);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
//    @PutMapping("/updateproduct/{productId}")
//    public ResponseEntity<?> updateProduct(@PathVariable("productId") int productId, @RequestBody Product product){
//        product.setId(productId);
//        return new ResponseEntity<>(productService.updateProduct(product),HttpStatus.OK);
//    }




}
