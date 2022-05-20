package com.cotiviti.bid.playload;

public class ResponseBidDto {

    private int id;
    private String username;
    private int userId;
    private int productId;
    private String productName;
    private String productDescription;
    private int price;
    private int biddingPrice;
    private Boolean approved;


    public Boolean getApproved() {
        return approved;
    }
    public void setApproved(Boolean approved) {
        this.approved = approved;
    }
    public int getBidId() {
        return id;
    }

    public void setBidId(int bidId) {
        this.id = bidId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getBiddingPrice() {
        return biddingPrice;
    }

    public void setBiddingPrice(int biddingPrice) {
        this.biddingPrice = biddingPrice;
    }
}