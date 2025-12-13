package com.example.e_commerce_backend.dtos.review;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateReviewRequestDto {
    @NotBlank(message = "Product is null")
    String productId;
    @NotBlank(message = "Author is null") @Size(min = 2, max = 50)
    String author;
    @NotNull(message = "Rating is null")
    @Min(1)
    @Max(5)
    Integer rating;
    @Size(max = 2000, message = "Max length of a comment is 2000 symbols")
    String comment;
}
