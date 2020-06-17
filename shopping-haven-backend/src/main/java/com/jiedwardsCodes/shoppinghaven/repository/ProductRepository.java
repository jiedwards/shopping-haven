package com.jiedwardsCodes.shoppinghaven.repository;

import com.jiedwardsCodes.shoppinghaven.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
