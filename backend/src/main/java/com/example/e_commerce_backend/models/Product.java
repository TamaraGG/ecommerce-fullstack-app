package com.example.e_commerce_backend.models;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@AllArgsConstructor
@Data
@Document
@NoArgsConstructor
public class Product {
    @Id
    String id;
    @Field(targetType = FieldType.INT32) @Nonnull
    String name;

    String category;
    String description;
}
