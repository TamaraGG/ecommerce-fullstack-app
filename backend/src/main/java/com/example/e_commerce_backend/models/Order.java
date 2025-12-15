package com.example.e_commerce_backend.models;

import com.example.e_commerce_backend.dtos.order.OrderItemDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Order {

    @Id
    String id;

    @CreatedDate
    Instant createdAt;
    //Client data
    String email;
    String name;
    String address;
    String phone;

    String status;
    BigDecimal total;
    List<OrderItemDto> items;
}
