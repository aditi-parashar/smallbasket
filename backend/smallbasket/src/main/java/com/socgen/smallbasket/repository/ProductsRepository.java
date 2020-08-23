package com.socgen.smallbasket.repository;

import com.socgen.smallbasket.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Product, Integer> {
}
