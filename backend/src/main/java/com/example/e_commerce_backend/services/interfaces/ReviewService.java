package com.example.e_commerce_backend.services.interfaces;

import com.example.e_commerce_backend.dtos.review.CreateReviewRequestDto;
import com.example.e_commerce_backend.dtos.review.ReviewDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewService {

    ReviewDto createReview(CreateReviewRequestDto request);
    ReviewDto getReviewById(String id);
    Page<ReviewDto> getReviewsByProductId(String productId, Pageable pageable);
}
