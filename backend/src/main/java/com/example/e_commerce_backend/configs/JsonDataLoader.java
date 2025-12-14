package com.example.e_commerce_backend.configs;
import com.example.e_commerce_backend.models.Product;
import com.example.e_commerce_backend.repos.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import tools.jackson.core.type.TypeReference;


import java.io.InputStream;
import java.util.List;

@Slf4j
@Component
@Profile("dev")
@RequiredArgsConstructor
public class JsonDataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final tools.jackson.databind.ObjectMapper objectMapper;

    @Override
    public void run(String... args) throws Exception {
        ClassPathResource resource = new ClassPathResource("data.json");
        if (!resource.exists()) {
            log.warn("File data.json not found.");
            return;
        }

        productRepository.deleteAll();

        try (InputStream inputStream = resource.getInputStream()) {
            List<Product> products = objectMapper.readValue(
                    inputStream,
                    new TypeReference<List<Product>>() {}
            );

            productRepository.saveAll(products);
            log.info("Loaded {} products", products.size());
        } catch (Exception e) {
            log.error("Error while reading JSON: ", e);
        }
    }
}