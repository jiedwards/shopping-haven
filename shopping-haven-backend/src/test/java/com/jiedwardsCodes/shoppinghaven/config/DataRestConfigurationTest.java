package com.jiedwardsCodes.shoppinghaven.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class DataRestConfigurationTest {

    //Get request tests

    @Test
    public void apiGetRequestShouldReturnOk200(@Autowired MockMvc mockMvc) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api")).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void productGetRequestShouldReturnOk200(@Autowired MockMvc mockMvc) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/products")).andExpect(MockMvcResultMatchers.status().isOk());
    }

    //Post request tests as method is disabled

    @Test
    public void productPostRequestShouldFail(@Autowired MockMvc mockMvc) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/products")
                .content("{\"id\": 1"))
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @Test
    public void productCategoryPostRequestShouldFail(@Autowired MockMvc mockMvc) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/productcategory")
                .content("{\"id\": 1"))
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    //Delete request tests as method is disabled

    @Test
    public void productDeleteRequestShouldFail(@Autowired MockMvc mockMvc) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/products")
                .content("{\"id\": 1"))
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @Test
    public void productCategoryDeleteRequestShouldFail(@Autowired MockMvc mockMvc) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/productcategory")
                .content("{\"id\": 1"))
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }


    //Put request tests as method is disabled

    @Test
    public void productPutRequestShouldFail(@Autowired MockMvc mockMvc) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/products/1")
                .content("{\"id\": 1"))
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @Test
    public void productCategoryPutRequestShouldFail(@Autowired MockMvc mockMvc) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/productcategory")
                .content("{\"id\": 1"))
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }
}