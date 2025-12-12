package com.example.e_commerce_backend.dtos;

import lombok.Builder;

import java.time.Instant;

@Builder
public record ReviewDto(String id, String productId, String author, Integer rating, String comment, Instant createdAt) {
}
