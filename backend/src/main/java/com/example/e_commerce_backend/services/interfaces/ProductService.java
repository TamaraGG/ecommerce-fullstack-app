package com.example.e_commerce_backend.services.interfaces;

import com.example.e_commerce_backend.dtos.ProductDto;
import com.example.e_commerce_backend.models.Product;

import java.util.Optional;

public interface ProductService {
   Optional<Product> getById(String id);
   ProductDto save(Product product);
}
