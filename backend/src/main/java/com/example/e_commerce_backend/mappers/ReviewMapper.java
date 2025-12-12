package com.example.e_commerce_backend.mappers;

import com.example.e_commerce_backend.dtos.ReviewDto;
import com.example.e_commerce_backend.models.Review;

public class ReviewMapper {
    public static ReviewDto toReviewDto(Review review) {
        return ReviewDto.builder()
                .id(review.getId())
                .productId(review.getProductId())
                .author(review.getAuthor())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
