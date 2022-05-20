package com.cotiviti.bid.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.cotiviti.bid.playload.ResponseBidDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cotiviti.bid.model.Bid;
import com.cotiviti.bid.repo.BidRepo;
import com.cotiviti.bid.service.BidService;


@Service
public class BidServiceImpl implements BidService {
	
	private BidRepo bidRepo;
	
	
	
	@Autowired
	public BidServiceImpl(BidRepo bidRepo) {
		super();
		this.bidRepo = bidRepo;
	}

	@Override
	public Bid addBid(Bid bid) {
		// TODO Auto-generated method stub
		List<Bid> allBids = bidRepo.findAll();
		for(Bid item : allBids){
			if(item.getProduct().getId() == bid.getProduct().getId()){
				if(item.getApproved() == true){
					return null;
				}else{
					continue;
				}
			}else{
				continue;
			}
		}
		bid.setApproved(false);
		return bidRepo.save(bid);
	}

	@Override
	public List<Bid> getAllBids() {
		// TODO Auto-generated method stub
		return bidRepo.findAll();
	}

	@Override
	public Bid getBidById(int id) {
		// TODO Auto-generated method stub
		return bidRepo.getById(id);
	}

	@Override
	public List<ResponseBidDto> getByUserId(int id) {
		List<Bid> allBids= bidRepo.findAll();
		List<ResponseBidDto> requiredList = new ArrayList<>();
		for(Bid item : allBids){
			if(item.getUser().getId() == id){
				ResponseBidDto responseBidDto = new ResponseBidDto();
				responseBidDto.setBidId(item.getId());
				responseBidDto.setBiddingPrice(item.getBiddingPrice());
				responseBidDto.setUserId(item.getUser().getId());
				responseBidDto.setUsername(item.getUser().getUsername());
				responseBidDto.setProductId(item.getProduct().getId());
				responseBidDto.setProductName(item.getProduct().getProductName());
				responseBidDto.setProductDescription(item.getProduct().getDescription());
				responseBidDto.setPrice(item.getProduct().getPrice());
				responseBidDto.setApproved(item.getApproved());
				requiredList.add(responseBidDto);
			}
		}
		if(requiredList.size()!=0){
			return requiredList;
		}else{
			return null;
		}
	}

	@Override
	public List<ResponseBidDto> getByProductId(int pId) {
		List<Bid> allBids= bidRepo.findAll();
		List<ResponseBidDto> requiredList = new ArrayList<>();
		for(Bid item : allBids){
			if(item.getProduct().getId() == pId ){
				ResponseBidDto responseBidDto = new ResponseBidDto();
				responseBidDto.setBidId(item.getId());
				responseBidDto.setBiddingPrice(item.getBiddingPrice());
				responseBidDto.setUserId(item.getUser().getId());
				responseBidDto.setUsername(item.getUser().getUsername());
				responseBidDto.setProductId(item.getProduct().getId());
				responseBidDto.setProductName(item.getProduct().getProductName());
				responseBidDto.setProductDescription(item.getProduct().getDescription());
				responseBidDto.setPrice(item.getProduct().getPrice());
				responseBidDto.setApproved(item.getApproved());
				requiredList.add(responseBidDto);
			}
		}
		if(requiredList.size()!=0){
			return requiredList;
		}else{
			return null;
		}
	}

	@Override
	public Bid approveBid(int bidId) {
		List<Bid> allBids = bidRepo.findAll();
		Bid approveBid = bidRepo.getById(bidId);
		for(Bid item : allBids){
			if(item.getProduct().getId() == approveBid.getProduct().getId()){
				if(item.getApproved() !=true){
					continue;
				}else{
					return null;
				}
			}else{
				continue;
			}
		}
		approveBid.setApproved(true);
		approveBid.setId(bidId);
		bidRepo.save(approveBid);
		return approveBid;

	}
	@Override
	public int countAllBids(){
		List<Bid> allBids = bidRepo.findAll();
		int bidCount = 0;
		for(Bid item : allBids ){
			bidCount++;
		}
		return bidCount;
	}
	@Override
	public int countBidsByUserId(int userId){
		List<ResponseBidDto> allBids = getByUserId(userId);
		int bidCount = 0;
		for(ResponseBidDto item : allBids ){
			bidCount++;
		}
		return bidCount;
	}
}
