package com.example.e_commerce_backend.controllers;

import com.example.e_commerce_backend.dtos.CreateReviewRequestDto;
import com.example.e_commerce_backend.dtos.ReviewDto;
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
    ReviewService reviewService;

    @PostMapping
    ResponseEntity<ReviewDto> createReview(@RequestBody @Validated CreateReviewRequestDto request) {
        return ResponseEntity.ok(reviewService.createReview(request));
    }

    @GetMapping
    ResponseEntity<Page<ReviewDto>> getReviews(@RequestParam(required = true) String productId,
                                               @PageableDefault Pageable pageable) {
        return ResponseEntity.ok(reviewService.getReviewsByProductId(productId, pageable));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
