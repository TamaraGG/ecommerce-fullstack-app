package com.example.e_commerce_backend.dtos.order;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

//what to return for GET order request
@Builder
public record OrderDto(CustomerDto customer,
                       Instant createdAt,
                       BigDecimal total,
                       List<OrderItemDto> items) {
}
