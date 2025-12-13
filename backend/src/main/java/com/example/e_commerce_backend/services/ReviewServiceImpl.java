package com.example.e_commerce_backend.services;

import com.example.e_commerce_backend.dtos.CategoryStatsDto;
import com.example.e_commerce_backend.dtos.CreateReviewRequestDto;
import com.example.e_commerce_backend.dtos.ReviewDto;
import com.example.e_commerce_backend.exceptions.ResourceNotFoundException;
import com.example.e_commerce_backend.mappers.ReviewMapper;
import com.example.e_commerce_backend.models.Review;
import com.example.e_commerce_backend.repos.ReviewRepository;
import com.example.e_commerce_backend.services.interfaces.ProductService;
import com.example.e_commerce_backend.services.interfaces.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductService productService;



    @Override @Transactional
    public ReviewDto createReview(CreateReviewRequestDto request) {
        Objects.requireNonNull(request, "request is null");
        if (!productService.existsById(request.getProductId())) {
            throw new ResourceNotFoundException(request.getProductId() + " not found");
        }
//        Optional.ofNullable(request.getProductId())
//                .filter(productService::ifExistsById)
//                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Review newReview = Review.builder()
                .productId(request.getProductId())
                .author(request.getAuthor())
                .rating(request.getRating())
                .comment(request.getComment())
                .build();
        reviewRepository.save(newReview);
        productService.updateProductRating(newReview.getProductId(), newReview.getRating());
        return ReviewMapper.toReviewDto(newReview);
    }

    @Override
    public ReviewDto getReviewById(String id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));
        return ReviewMapper.toReviewDto(review);
    }

    @Override
    public Page<ReviewDto> getReviewsByProductId(String productId, Pageable pageable) {
        Page<Review> reviews = reviewRepository.findByProductId(productId,pageable);
        return reviews.map(ReviewMapper::toReviewDto);
    }

}
