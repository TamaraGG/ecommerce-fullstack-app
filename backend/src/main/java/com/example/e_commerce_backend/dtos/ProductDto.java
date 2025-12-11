package com.example.e_commerce_backend.dtos;


import lombok.Builder;

import java.math.BigDecimal;
import java.util.Map;

@Builder
public record ProductDto(
        String id,
        String name,
        String category,
        String description,
        BigDecimal price,
        String imageBase64,

        Map<String, Object> specs,
        Integer quantity
){
//    public ProductDto {
//        if (id == null || id.isBlank()) {
//            throw new IllegalArgumentException("Product ID must not be null or blank in Response DTO.");
//        }
//    }
}