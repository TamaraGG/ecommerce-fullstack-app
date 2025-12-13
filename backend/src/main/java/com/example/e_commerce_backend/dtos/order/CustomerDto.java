package com.example.e_commerce_backend.dtos.order;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomerDto {

    @NotBlank @Size(min = 2, max = 50)
    String name;

    @Email
    @NotBlank
    String email;

    @NotBlank @Size(min = 2, max = 100)
    String address;
}
