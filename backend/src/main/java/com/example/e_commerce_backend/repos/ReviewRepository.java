package com.example.e_commerce_backend.repos;

import com.example.e_commerce_backend.models.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface ReviewRepository extends MongoRepository<Review, String> {
    Page<Review> findByProductId(String productId, Pageable pageable);
}
