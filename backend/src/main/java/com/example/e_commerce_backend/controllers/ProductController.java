package com.example.e_commerce_backend.controllers;

import com.example.e_commerce_backend.dtos.CategoryStatsDto;
import com.example.e_commerce_backend.dtos.CreateProductRequestDto;
import com.example.e_commerce_backend.exceptions.ResourceNotFoundException;
import com.example.e_commerce_backend.dtos.ProductDto;
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

    ProductService productService;


    @GetMapping("/{id}")
    ResponseEntity<ProductDto> getById(@PathVariable String id) {
        return ResponseEntity.ok(productService.getById(id));
    }

    @PostMapping
        //TODO: нужен глобальный обработчик, с ним круто выводится все поля где неверная инфа введена
    ResponseEntity<ProductDto> createProduct(@RequestBody @Validated CreateProductRequestDto productRequestDto) {
        return new ResponseEntity<>(productService.createProduct(productRequestDto), HttpStatus.CREATED);
    }

    // /api/products/?category={category}&sort={sort}&page={page}&size={size}
    @GetMapping
    ResponseEntity<Page<ProductDto>> getProducts(@RequestParam(required = false) String category,
                                                 @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(productService.getProductsByCategory(category, pageable));
    }

    @GetMapping("/categories")
    ResponseEntity<List<CategoryStatsDto>> getCategories(){
        return ResponseEntity.ok(productService.findAllCategories());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
