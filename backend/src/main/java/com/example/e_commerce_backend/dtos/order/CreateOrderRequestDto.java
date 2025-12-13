package com.example.e_commerce_backend.dtos.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequestDto {
    @Valid
    @NotNull
    CustomerDto customer;

    @Valid
    @NotEmpty
    List<CreateOrderItemDto> items;
}
