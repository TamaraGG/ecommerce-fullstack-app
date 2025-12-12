package com.example.e_commerce_backend.models;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Review {
    @Id
    String id;
    @Indexed//@DbRef not recommended
    String productId;
    @Indexed
    String userId;
    String author;
    Integer rating;
    String comment;
    @CreatedDate
    Instant createdAt;
}
