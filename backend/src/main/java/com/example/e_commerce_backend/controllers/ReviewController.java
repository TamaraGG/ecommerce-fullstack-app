package com.example.e_commerce_backend.controllers;

import com.example.e_commerce_backend.dtos.review.CreateReviewRequestDto;
import com.example.e_commerce_backend.dtos.review.ReviewDto;
import com.example.e_commerce_backend.exceptions.ResourceNotFoundException;
import com.example.e_commerce_backend.services.interfaces.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {
    final ReviewService reviewService;

    @PostMapping
    ResponseEntity<ReviewDto> createReview(@RequestBody @Validated CreateReviewRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.createReview(request));
    }

    @GetMapping
    ResponseEntity<Page<ReviewDto>> getReviews(@RequestParam(required = true) String productId,
                                               @PageableDefault Pageable pageable) {
        return ResponseEntity.ok(reviewService.getReviewsByProductId(productId, pageable));
    }

}
