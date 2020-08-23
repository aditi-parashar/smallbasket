package com.socgen.smallbasket.model;


/**
 * Represents a Product.
 */

import javax.persistence.*;

@Entity(name="products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double price;

    @Column(name="image", nullable = false)
    private String imageName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return imageName;
    }

    public void setImage(String image) {
        this.imageName = image;
    }

    public Product(int id, String name, double price, String image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageName = image;
    }

    protected Product() {
    }
}
