package com.example.e_commerce_backend.controllers;

import com.example.e_commerce_backend.dtos.order.CreateOrderRequestDto;
import com.example.e_commerce_backend.dtos.order.OrderDto;
import com.example.e_commerce_backend.exceptions.ResourceNotFoundException;
import com.example.e_commerce_backend.services.interfaces.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    final OrderService orderService;

    @PostMapping
    ResponseEntity<OrderDto> createOrder(@RequestBody @Validated CreateOrderRequestDto createOrderRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(createOrderRequestDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrder(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrderById(id));
    }

}
