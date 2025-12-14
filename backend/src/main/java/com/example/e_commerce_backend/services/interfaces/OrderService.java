package com.example.e_commerce_backend.services.interfaces;


import com.example.e_commerce_backend.dtos.order.CreateOrderRequestDto;
import com.example.e_commerce_backend.dtos.order.OrderDto;

public interface OrderService {
    OrderDto getOrderById(String id);
    OrderDto createOrder(CreateOrderRequestDto request);
}
