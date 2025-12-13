package com.example.e_commerce_backend.mappers;

import com.example.e_commerce_backend.dtos.order.CustomerDto;
import com.example.e_commerce_backend.dtos.order.OrderDto;
import com.example.e_commerce_backend.models.Order;

public class OrderMapper {
    public static OrderDto toOrderDto(Order order) {
        return OrderDto.builder()
                .items(order.getItems())
                .total(order.getTotal())
                .createdAt(order.getCreatedAt())
                .customer(new CustomerDto(order.getName(), order.getEmail(), order.getPhone(), order.getAddress()))
                .build();
    }
}
