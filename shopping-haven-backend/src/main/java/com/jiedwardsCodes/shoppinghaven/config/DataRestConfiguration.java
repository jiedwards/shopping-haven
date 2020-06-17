package com.jiedwardsCodes.shoppinghaven.config;

import com.jiedwardsCodes.shoppinghaven.entity.Product;
import com.jiedwardsCodes.shoppinghaven.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        HttpMethod[] unsupportedRequests = {HttpMethod.DELETE, HttpMethod.PUT, HttpMethod.POST};

        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedRequests))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedRequests));

        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedRequests))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedRequests));
    }
}
