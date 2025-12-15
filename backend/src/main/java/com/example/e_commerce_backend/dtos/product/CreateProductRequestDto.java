package com.example.e_commerce_backend.dtos.product;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
public class CreateProductRequestDto {
    @NotBlank(message = "Name must not be blank") @Size(min = 2, max = 100)
    String name;
    @NotBlank(message = "Category is mandatory")  @Size(min = 1, max = 30)
    String category;
    @Size(min = 2, max = 200)
    String description;
    @NotNull(message = "Price cannot be null") @Positive(message = "Price must be positive")
    @Digits(integer = 15, fraction = 2, message="Requires exactly 2 digits after comma")
    BigDecimal price;
    @Valid
    @Size(max = 100)
    Map<@NotBlank(message = "Spec name cannot be blank") @Size(min=2, max=50) String,
        @NotNull(message = "Spec value cannot be null")  Object> specs;
    String imageBase64;
    @NotNull @PositiveOrZero (message = "Quantity cannot be negative")
    Integer quantity;
}
