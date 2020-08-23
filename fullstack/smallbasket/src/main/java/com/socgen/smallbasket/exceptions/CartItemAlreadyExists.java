package com.socgen.smallbasket.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CartItemAlreadyExists extends RuntimeException {
    public CartItemAlreadyExists() {
        super("Item already exists in the cart.");
    }
}
