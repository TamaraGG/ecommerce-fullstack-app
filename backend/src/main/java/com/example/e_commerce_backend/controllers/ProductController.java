package com.example.e_commerce_backend.controllers;

import com.example.e_commerce_backend.exceptions.ResourceNotFoundException;
import com.example.e_commerce_backend.dtos.ProductDto;
import com.example.e_commerce_backend.models.Product;
import com.example.e_commerce_backend.services.interfaces.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {

ProductService productService;


@GetMapping("/{id}")
ResponseEntity<Product> findById(@PathVariable String id){
    Optional<Product> product = productService.getById(id);
    return product.map(ResponseEntity::ok)
            .orElseThrow(()->new ResourceNotFoundException("Requested task with id = "+ id + " not found"));
}

@PostMapping
ResponseEntity<ProductDto> createProduct(@RequestBody @Validated Product product){
    return new ResponseEntity<>(productService.save(product), HttpStatus.CREATED);
}


@ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex){
    return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
}
}
