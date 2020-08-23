package com.socgen.smallbasket.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class QuantityException extends RuntimeException {
    public QuantityException() {
        super("Value of Quantity is not valid.");
    }
}
