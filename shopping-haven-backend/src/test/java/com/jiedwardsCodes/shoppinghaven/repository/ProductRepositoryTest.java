package com.jiedwardsCodes.shoppinghaven.repository;

import com.jiedwardsCodes.shoppinghaven.entity.Product;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testProductRepositoryGetOneById() {
        Long id = 1L;
        Product product = new Product();
        product.setId(id);

        Product productResponse = productRepository.getOne(id);

        Assertions.assertEquals(productResponse.getId(), id);

    }

}