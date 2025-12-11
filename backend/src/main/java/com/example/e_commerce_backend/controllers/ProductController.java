package com.example.e_commerce_backend.controllers;

import com.example.e_commerce_backend.dtos.CreateProductRequestDto;
import com.example.e_commerce_backend.exceptions.ResourceNotFoundException;
import com.example.e_commerce_backend.dtos.ProductDto;
import com.example.e_commerce_backend.services.interfaces.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {

ProductService productService;


@GetMapping("/{id}")
ResponseEntity<ProductDto> getById(@PathVariable String id){
    return ResponseEntity.ok(productService.getById(id));
}

@PostMapping
ResponseEntity<ProductDto> createProduct(@RequestBody @Validated CreateProductRequestDto productRequestDto){
    return new ResponseEntity<>(productService.save(productRequestDto), HttpStatus.CREATED);
}


@ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex){
    return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
}
}
