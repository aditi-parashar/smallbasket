package com.socgen.smallbasket.controller;


import com.socgen.smallbasket.exceptions.CartItemAlreadyExists;
import com.socgen.smallbasket.exceptions.CartItemNotFoundException;
import com.socgen.smallbasket.exceptions.QuantityException;
import com.socgen.smallbasket.model.CartItem;
import com.socgen.smallbasket.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    /**
     * This method is the end point for cart items GET request.
     * @return List<CartItem> This returns list of Cart items.
     */
    @GetMapping
    public List<CartItem> getCartContent() {
        return cartRepository.findAll();
    }

    /**
     * This method is the end point for cart items POST request.
     * @param cartItem The item that needs to be added into cart.
     * @exception ResponseStatusException On invalid input error.
     * @return Cart This returns the newly added item into the cart.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CartItem addToCart(@Valid @RequestBody final CartItem cartItem) {
        /* If the Item Id in the request body or the product already exists in the cart */
        List<CartItem> cartItems = cartRepository.findAll();
        if (cartItems.size() != 0) {
            for (CartItem item : cartItems) {
                /* Check if the Item Id already exists */
                if ( cartItem.getItemId() > 0 ) {
                    if (item.getItemId() == cartItem.getItemId()) {
                        /* If the Item Id exists in the cart, then POST is not allowed. */
                        throw new CartItemAlreadyExists();
                    }
                } else if ( item.getProduct().getId() == cartItem.getProduct().getId() ) {
                    throw new CartItemAlreadyExists();
                }
            }
        }

        /* If the quantity is less than 0 */
        if (cartItem.getQuantity() <= 0) {
            throw new QuantityException();
        }

        CartItem returnCartItem =  cartRepository.saveAndFlush(cartItem);
        return returnCartItem;
    }

    /**
     * This method is the end point for cart items PUT request.
     * @param id The id of the item that needs to be updated in the cart.
     * @param cartItem Cart item that needs to be updated.
     * @exception ResponseStatusException On invalid input error.
     * @return Cart This returns the updated item in the cart.
     */
    @PutMapping("/{id}")
    public CartItem updateCart(@Valid @PathVariable int id, @RequestBody CartItem cartItem) {
        /* Get the item from the cart table using the received id, update its quantity and persist */
        Optional<CartItem> optionalCartItem = cartRepository.findById(id);

        /* If the item doesn't exist */
        if (!optionalCartItem.isPresent()) {
            throw new CartItemNotFoundException();
        }

        /* If the quantity is less than 0 */
        if (cartItem.getQuantity() <= 0) {
            throw new QuantityException();
        }

        CartItem existingCartItem = cartRepository.getOne(id);
        existingCartItem.setQuantity(cartItem.getQuantity());
        return cartRepository.saveAndFlush(existingCartItem);
    }

    /**
     * This method is the end point for cart items DELETE request.
     * @param id The item id that needs to be deleted from the cart.
     * @exception ResponseStatusException On invalid input error.
     * @return void This doesn't return anything.
     */
    @DeleteMapping("/{id}")
    public void deleteFromCart(@PathVariable int id) {
        try {
            cartRepository.deleteById(id);
        } catch(EmptyResultDataAccessException e) {
            throw new CartItemNotFoundException();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating item in the cart.", e);
        }
    }
}
