package com.example.e_commerce_backend.dtos.order;

//Dto for response
public record OrderItemDto(String productId, String name, int quantity, double price) {
}
