package com.example.e_commerce_backend.models;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.math.BigDecimal;
import java.util.Map;


@AllArgsConstructor
@Data
@Document
@NoArgsConstructor
@Builder
public class Product {
    @Id
    String id;
    String name;
    @Indexed
    String category;
    String description;
    @Field(targetType = FieldType.DECIMAL128)
    BigDecimal price;
    Map<String,Object> specs;
    String imageBase64;
    Integer quantity;
    //Данные из reviews - денормализация
    Double averageRating = 0.0;
    Integer reviewCount = 0;

    //optimistic locking
    @Version
    Long version;
}
