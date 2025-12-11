package com.example.e_commerce_backend.repos;

import com.example.e_commerce_backend.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product,String> {
}
