package com.example.e_commerce_backend.dtos.product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryStatsDto {
    String category;
    String imageBase64;
    Long count;
}
