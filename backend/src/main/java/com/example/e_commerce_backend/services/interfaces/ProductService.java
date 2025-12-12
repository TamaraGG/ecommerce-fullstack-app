package com.example.e_commerce_backend.services.interfaces;

import com.example.e_commerce_backend.dtos.CategoryStatsDto;
import com.example.e_commerce_backend.dtos.CreateProductRequestDto;
import com.example.e_commerce_backend.dtos.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
   ProductDto getById(String id);
   ProductDto createProduct(CreateProductRequestDto product);
   Page<ProductDto> getProductsByCategory(String category, Pageable pageable);
   void updateProductRating(String productId, Integer rating);
   boolean existsById(String productId);
   List<CategoryStatsDto> findAllCategories();
   Page<ProductDto> searchProductsByPattern(String pattern, Pageable pageable);
}
