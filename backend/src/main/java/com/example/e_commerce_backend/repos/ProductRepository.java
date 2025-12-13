package com.example.e_commerce_backend.repos;

import com.example.e_commerce_backend.dtos.product.CategoryStatsDto;
import com.example.e_commerce_backend.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product,String> {
    Page<Product> findByCategory(String category, Pageable pageable);
    //TODO: FIX THIS BUT WORKS. VIBECODED. LOOKS VERY BAD IN JS IT LOOKED BETTER
    @Aggregation(pipeline = {
            "{ '$addFields': { " +
                    "'hasImageScore': { " +
                    "'$cond': { " +
                    "'if': { '$and': [ { '$ne': ['$imageBase64', null] }, { '$ne': ['$imageBase64', ''] } ] }, " +
                    "'then': 1, " +
                    "'else': 0 " +
                    "} " +
                    "} " +
                    "} }",
            "{ '$sort': { 'hasImageScore': -1 } }",
            "{ '$group': { " +
                    "'_id': '$category', " +
                    "'count': { '$sum': 1 }, " +
                    "'imageBase64': { '$first': '$imageBase64' }" +
                    "} }",
            "{ '$sort': { '_id': 1 } }",
            "{ '$project': { " +
                    "'category': '$_id', " +
                    "'count': 1, " +
                    "'imageBase64': 1, " +
                    "'_id': 0 " +
                    "} }"
    })
    List<CategoryStatsDto> findAllCategories();

    @Query(value = "{ '$text': { '$search': ?0 } }", sort = "{ 'score': { '$meta': 'textScore' } }")
    Page<Product> searchByText(String text, Pageable pageable);
}
