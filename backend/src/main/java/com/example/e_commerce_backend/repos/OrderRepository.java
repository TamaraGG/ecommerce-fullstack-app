package com.example.e_commerce_backend.repos;

import com.example.e_commerce_backend.models.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
}
