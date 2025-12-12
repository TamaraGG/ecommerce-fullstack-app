package com.example.e_commerce_backend.services;

import com.example.e_commerce_backend.dtos.CreateProductRequestDto;
import com.example.e_commerce_backend.dtos.ProductDto;
import com.example.e_commerce_backend.exceptions.ResourceNotFoundException;
import com.example.e_commerce_backend.mappers.ProductMapper;
import com.example.e_commerce_backend.models.Product;
import com.example.e_commerce_backend.repos.ProductRepository;
import com.example.e_commerce_backend.services.interfaces.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;

    @Override
    public ProductDto getById(String id) {
        Product retrievedProduct = productRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Product not found"));
        return ProductMapper.toProductDto(retrievedProduct);
    }

    @Override
    public ProductDto save(CreateProductRequestDto request) {
        Objects.requireNonNull(request, "Product name must not be null");
        Product newProduct = Product.builder()
                .name(request.getName())
                .category(request.getCategory())
                .description(request.getDescription())
                .price(request.getPrice())
                .specs(request.getSpecs())
                .imageBase64(request.getImageBase64())
                .quantity(request.getQuantity())
                .build();
        Product savedProduct = productRepository.save(newProduct);
        return ProductMapper.toProductDto(savedProduct);
    }

    @Override
    public Page<ProductDto> getProductsByCategory(String category, Pageable pageable) {
        Page<Product> products;
        if (category == null || category.isEmpty()) {
            products = productRepository.findAll(pageable);
        } else {
            products = productRepository.findByCategory(category, pageable);
        }
        return products.map(ProductMapper::toProductDto);
    }
}
