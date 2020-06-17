package com.jiedwardsCodes.shoppinghaven.repository;

import com.jiedwardsCodes.shoppinghaven.entity.ProductCategory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ProductCategoryRepositoryTest {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Test
    public void testProductCategoryRepositoryGetOneById() {

        Long id = 1L;
        ProductCategory productCategory = new ProductCategory();
        productCategory.setId(id);

        ProductCategory productCategoryResponse = productCategoryRepository.getOne(id);

        Assertions.assertEquals(productCategoryResponse.getId(), id);
    }
}