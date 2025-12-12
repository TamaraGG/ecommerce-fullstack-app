package com.example.e_commerce_backend.mappers;

import com.example.e_commerce_backend.dtos.ProductDto;
import com.example.e_commerce_backend.models.Product;

public class ProductMapper {
    public static ProductDto toProductDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .category(product.getCategory())
                .description(product.getDescription())
                .price(product.getPrice())
                .imageBase64(product.getImageBase64())
                .specs(product.getSpecs())
                .quantity(product.getQuantity())
                .averageRating(product.getAverageRating())
                .reviewCount(product.getReviewCount())
                .build();
    }
}
