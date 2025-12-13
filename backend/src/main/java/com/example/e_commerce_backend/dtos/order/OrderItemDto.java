package com.example.e_commerce_backend.dtos.order;

import lombok.Builder;

import java.math.BigDecimal;

//Dto for response
@Builder
public record OrderItemDto(String productId,
                           String name,
                           int quantity,
                           BigDecimal price) {
}
