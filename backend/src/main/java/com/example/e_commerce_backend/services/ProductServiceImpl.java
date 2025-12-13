package com.example.e_commerce_backend.services;

import com.example.e_commerce_backend.dtos.product.CategoryStatsDto;
import com.example.e_commerce_backend.dtos.product.CreateProductRequestDto;
import com.example.e_commerce_backend.dtos.product.ProductDto;
import com.example.e_commerce_backend.exceptions.NotEnoughStockException;
import com.example.e_commerce_backend.exceptions.ResourceNotFoundException;
import com.example.e_commerce_backend.mappers.ProductMapper;
import com.example.e_commerce_backend.models.Product;
import com.example.e_commerce_backend.repos.ProductRepository;
import com.example.e_commerce_backend.services.interfaces.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.resilience.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public ProductDto getProductById(String id) {
        Product retrievedProduct = productRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Product not found"));
        return ProductMapper.toProductDto(retrievedProduct);
    }

    @Override @CacheEvict(value = "categories", allEntries = true)
    public ProductDto createProduct(CreateProductRequestDto request) {
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



    @Override @Transactional @Retryable(value = OptimisticLockingFailureException.class, maxRetries = 3)
    public void updateProductRating(String productId, Integer rating) {
        Product pToUpdate = productRepository.findById(productId)
                .orElseThrow(()-> new ResourceNotFoundException("Product not found"));
        int oldReviewCount = pToUpdate.getReviewCount();
        double newRating = (pToUpdate.getAverageRating()*oldReviewCount + rating)
                / (oldReviewCount+1);
        Double newRoundedRating = Math.round(newRating*100.0)/100.0;

        pToUpdate.setAverageRating(newRoundedRating);
        pToUpdate.setReviewCount(oldReviewCount+1);
        productRepository.save(pToUpdate);
    }

    @Override
    public boolean existsById(String productId) {
        return productRepository.existsById(productId);
    }

    @Override  @Cacheable("categories")
    public List<CategoryStatsDto> findAllCategories() {
        return productRepository.findAllCategories();
    }

    @Override
    public Page<ProductDto> searchProductsByPattern(String pattern, Pageable pageable) {
        Page<Product> products = productRepository.searchByText(pattern, pageable);
        return products.map(ProductMapper::toProductDto);
    }

    @Override
    public void decreaseStock(String productId, Integer amount) {
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new ResourceNotFoundException("Product not found"));
        if (product.getQuantity() < amount) {
            throw new NotEnoughStockException("Not enough stock to reserve product: " + product.getName()
                        +". Available stock: " + product.getQuantity());
        }
        product.setQuantity(product.getQuantity() - amount);
        productRepository.save(product);
    }


}
