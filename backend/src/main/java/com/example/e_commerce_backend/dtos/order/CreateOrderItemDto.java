package com.example.e_commerce_backend.dtos.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateOrderItemDto {
    @NotBlank @Size(min = 24, max = 24, message = "Provide valid MongoDB product id")
    private String productId;

    @Min(value = 1, message = "Order at least 1")
    private int quantity;
}
