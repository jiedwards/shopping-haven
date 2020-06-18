package com.jiedwardsCodes.shoppinghaven.repository;

import com.jiedwardsCodes.shoppinghaven.entity.Product;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
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

    @Test
    public void testFindByCategoryName(@Autowired MockMvc mockMvc) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/products/search/findByNameContaining?name=java"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testFindByCategoryId(@Autowired MockMvc mockMvc) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/products/search/findByCategoryId?id=2"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}