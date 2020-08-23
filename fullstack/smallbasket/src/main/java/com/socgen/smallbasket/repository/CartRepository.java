package com.socgen.smallbasket.repository;

import com.socgen.smallbasket.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<CartItem,Integer> {
}
