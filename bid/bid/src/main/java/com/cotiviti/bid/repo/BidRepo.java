package com.cotiviti.bid.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cotiviti.bid.model.Bid;

import java.util.Optional;

public interface BidRepo extends JpaRepository<Bid, Integer> {
}
