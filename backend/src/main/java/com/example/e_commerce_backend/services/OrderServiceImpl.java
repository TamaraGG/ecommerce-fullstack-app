package com.example.e_commerce_backend.services;

import com.example.e_commerce_backend.dtos.order.CreateOrderItemDto;
import com.example.e_commerce_backend.dtos.order.CreateOrderRequestDto;
import com.example.e_commerce_backend.dtos.order.OrderDto;
import com.example.e_commerce_backend.dtos.order.OrderItemDto;
import com.example.e_commerce_backend.dtos.product.ProductDto;
import com.example.e_commerce_backend.exceptions.ResourceNotFoundException;
import com.example.e_commerce_backend.mappers.OrderMapper;
import com.example.e_commerce_backend.models.Order;
import com.example.e_commerce_backend.repos.OrderRepository;
import com.example.e_commerce_backend.services.interfaces.OrderService;
import com.example.e_commerce_backend.services.interfaces.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.resilience.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final ProductService productService;

    @Override
    public OrderDto getOrderById(String id) {
        Order retrievedOrder = orderRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Order not found"));
        return OrderMapper.toOrderDto(retrievedOrder);
    }

    @Override
    @Retryable(value = OptimisticLockingFailureException.class, maxRetries = 3) //simple but not ideal at all.
    @Transactional
    public OrderDto createOrder(CreateOrderRequestDto request) {
        Order order = new Order();

        List<OrderItemDto> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;
        for (CreateOrderItemDto item : request.getItems()) {
            ProductDto productDto = productService.getProductById(item.getProductId());
            productService.decreaseStock(item.getProductId(), item.getQuantity());
            OrderItemDto itemDto = OrderItemDto.builder()
                    .name(productDto.name())
                    .price(productDto.price())
                    .quantity(item.getQuantity())
                    .productId(productDto.id())
                    .build();
            items.add(itemDto);
            total = total.add(itemDto.price().multiply(BigDecimal.valueOf(item.getQuantity())));
        }
        order.setItems(items);
        order.setTotal(total);
        order.setName(request.getCustomer().getName());
        order.setEmail(request.getCustomer().getEmail());
        order.setPhone(request.getCustomer().getPhone());
        order.setAddress(request.getCustomer().getAddress());
        order.setStatus("NEW");

        Order savedOrder = orderRepository.save(order);
        return OrderMapper.toOrderDto(savedOrder);
    }
}
