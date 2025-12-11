package com.example.e_commerce_backend.services;

import com.example.e_commerce_backend.dtos.ProductDto;
import com.example.e_commerce_backend.models.Product;
import com.example.e_commerce_backend.repos.ProductRepository;
import com.example.e_commerce_backend.services.interfaces.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;

    @Override
    public Optional<Product> getById(String id) {
        return productRepository.findById(id);
    }

    @Override
    public ProductDto save(Product product) {
        //TODO тут тоже проверка на случай вызова не из контроллера
        productRepository.save(product);
        return new ProductDto(product.getId());
    }
}
