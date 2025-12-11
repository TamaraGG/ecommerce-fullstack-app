package com.example.e_commerce_backend.services.interfaces;

import com.example.e_commerce_backend.dtos.CreateProductRequestDto;
import com.example.e_commerce_backend.dtos.ProductDto;
import com.example.e_commerce_backend.models.Product;

import java.util.Optional;

public interface ProductService {
   ProductDto getById(String id);
   ProductDto save(CreateProductRequestDto product);
}
