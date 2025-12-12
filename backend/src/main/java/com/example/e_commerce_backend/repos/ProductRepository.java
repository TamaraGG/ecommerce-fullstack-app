package com.example.e_commerce_backend.repos;

import com.example.e_commerce_backend.dtos.ProductDto;
import com.example.e_commerce_backend.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product,String> {
    Page<Product> findByCategory(String category, Pageable pageable);
   // Page<Product> findAll(Pageable pageable);
}
