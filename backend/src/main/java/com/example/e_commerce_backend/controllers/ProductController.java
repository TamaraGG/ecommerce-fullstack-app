package com.example.e_commerce_backend.controllers;

import com.example.e_commerce_backend.dtos.product.CategoryStatsDto;
import com.example.e_commerce_backend.dtos.product.CreateProductRequestDto;
import com.example.e_commerce_backend.exceptions.ResourceNotFoundException;
import com.example.e_commerce_backend.dtos.product.ProductDto;
import com.example.e_commerce_backend.services.interfaces.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {

    final ProductService productService;


    @GetMapping("/{id}")
    ResponseEntity<ProductDto> getProductById(@PathVariable String id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
        //TODO: нужен глобальный обработчик, с ним круто выводится все поля где неверная инфа введена
    ResponseEntity<ProductDto> createProduct(@RequestBody @Validated CreateProductRequestDto productRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(productRequestDto));
    }

    @GetMapping
    ResponseEntity<Page<ProductDto>> getProducts(@RequestParam(required = false) String category,
                                                 @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(productService.getProductsByCategory(category, pageable));
    }

    @GetMapping("/categories")
    ResponseEntity<List<CategoryStatsDto>> getCategories(){
        return ResponseEntity.ok(productService.findAllCategories());
    }

    @GetMapping("/search")
    ResponseEntity<Page<ProductDto>> searchProducts(@RequestParam String pattern, Pageable pageable) {
        return ResponseEntity.ok(productService.searchProductsByPattern(pattern, pageable));
    }

}
