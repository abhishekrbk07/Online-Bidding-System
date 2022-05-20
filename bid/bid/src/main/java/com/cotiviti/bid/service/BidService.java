package com.cotiviti.bid.service;

import java.util.List;

import com.cotiviti.bid.model.Bid;
import com.cotiviti.bid.playload.ResponseBidDto;

public interface BidService {
	
	Bid addBid(Bid bid);
	List<Bid> getAllBids();
	Bid getBidById(int id);
	List<ResponseBidDto> getByUserId(int id);
	List<ResponseBidDto> getByProductId(int productId);
	Bid approveBid(int bidId);


	int countAllBids();

	int countBidsByUserId(int userId);
}
