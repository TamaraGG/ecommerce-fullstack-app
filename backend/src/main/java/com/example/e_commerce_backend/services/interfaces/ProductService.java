package com.example.e_commerce_backend.services.interfaces;

import com.example.e_commerce_backend.dtos.product.CategoryStatsDto;
import com.example.e_commerce_backend.dtos.product.CreateProductRequestDto;
import com.example.e_commerce_backend.dtos.product.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
   ProductDto getProductById(String id);
   ProductDto createProduct(CreateProductRequestDto product);
   Page<ProductDto> getProductsByCategory(String category, Pageable pageable);
   void updateProductRating(String productId, Integer rating);
   boolean existsById(String productId);
   List<CategoryStatsDto> findAllCategories();
   Page<ProductDto> searchProductsByPattern(String pattern, Pageable pageable);
   void decreaseStock(String productId, Integer amount);
}
