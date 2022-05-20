package com.cotiviti.bid.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cotiviti.bid.playload.ResponseBidDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cotiviti.bid.model.Bid;
import com.cotiviti.bid.model.Product;
import com.cotiviti.bid.model.User;

import com.cotiviti.bid.repo.ProductRepo;
import com.cotiviti.bid.repo.UserRepo;
import com.cotiviti.bid.service.BidService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class BidController {
	
	private BidService bidService;
	private UserRepo userRepo;
	@Autowired
	public BidController(BidService bidService, UserRepo userRepo, ProductRepo productRepo) {
		super();
		this.bidService = bidService;
		this.userRepo = userRepo;
		this.productRepo = productRepo;
	}

	private ProductRepo productRepo;

	@PostMapping("/add-bid")
	public ResponseEntity<ResponseBidDto> addBid(@RequestParam(name = "productId") String productId, @RequestParam(name="userId") String userId ,
												 @RequestBody  Bid bid) {
		User user = userRepo.findById(Integer.parseInt(userId))
				.orElseThrow(() -> new RuntimeException("invalid user id"));
		bid.setUser(user);
		Product product = productRepo.findById(Integer.parseInt(productId))
				.orElseThrow(()->new RuntimeException("invalid product id"));
		bid.setProduct(product);
		Bid newBid = bidService.addBid(bid);
		ResponseBidDto responseBidDto = new ResponseBidDto();
		responseBidDto.setBidId(bid.getId());
		responseBidDto.setBiddingPrice(bid.getBiddingPrice());
		responseBidDto.setUserId(user.getId());
		responseBidDto.setUsername(user.getUsername());
		responseBidDto.setProductId(product.getId());
		responseBidDto.setProductName(product.getProductName());
		responseBidDto.setProductDescription(product.getDescription());
		responseBidDto.setPrice(product.getPrice());
//    if(newBid != null) {
		return new ResponseEntity<>(responseBidDto, HttpStatus.CREATED);
//    }
//    else{
//       return new ResponseEntity<>("Sorry Bidding for this item is already closed!!", HttpStatus.ALREADY_REPORTED);
//    }
	}



	@GetMapping("/bids")
	public ResponseEntity<List<Bid>> getAllBids(){
		return new ResponseEntity<>(bidService.getAllBids(), HttpStatus.OK);
	}
	
	@GetMapping("/bids/{id}")
	public ResponseEntity<Bid> getAllBids(@PathVariable("id") int id){
		return new ResponseEntity<>(bidService.getBidById(id), HttpStatus.OK);
	}

	@GetMapping("/bidsbyuser/{userId}")
	public ResponseEntity<?> getBidsByUserId(@PathVariable("userId") int userId){
		List <ResponseBidDto> responseBidDto = bidService.getByUserId(userId);
		if(responseBidDto != null){
			return new ResponseEntity<>(responseBidDto, HttpStatus.OK);
		}else{
			return new ResponseEntity<>("User ID is INVALID!!", HttpStatus.BAD_REQUEST);
		}
	}
	@GetMapping("/allbidsbyproduct/{productId}")
	public ResponseEntity<?> get(@PathVariable int productId) {
		List <ResponseBidDto> responseBidDto = bidService.getByProductId(productId);
		if(responseBidDto != null){
			return new ResponseEntity<>(responseBidDto, HttpStatus.OK);
		}else{
			return new ResponseEntity<>("Product ID is INVALID!!", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/approvebid/{bidId}")
	public ResponseEntity<?> approveBid(@PathVariable("bidId") int bidId){

		Bid bid = bidService.approveBid(bidId);
		if(bid != null){
			return new ResponseEntity<>(bid,HttpStatus.OK);
		}else{
			return new ResponseEntity<>("Too Late!! A Bid for this product is already Approved!!", HttpStatus.ALREADY_REPORTED);
		}

	}
	@GetMapping("/countallbids")
	public ResponseEntity<?> countAllBids(){
		int allbids = bidService.countAllBids();
		Map<String, Integer> map = new HashMap<>();
		map.put("allBids", allbids);
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
	@GetMapping("/countuserbids/{userId}")
	public ResponseEntity<?> countUserBids(@PathVariable("userId") int userId){
		int userBids = bidService.countBidsByUserId(userId);
		Map<String, Integer> map = new HashMap<>();
		map.put("allBids", userBids);
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

}

