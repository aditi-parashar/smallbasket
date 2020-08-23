package com.socgen.smallbasket.controller;

import com.socgen.smallbasket.model.Product;
import com.socgen.smallbasket.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductsController {
    @Autowired
    private ProductsRepository productsRepository;

    /**
     * This method is the end point for products list GET request.
     * @return List<Product> This returns list of all Products.
     */
    @GetMapping
    public List<Product> getProducts() {
        return productsRepository.findAll();
    }
}
