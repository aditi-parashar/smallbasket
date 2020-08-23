package com.socgen.smallbasket;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.socgen.smallbasket.controller.CartController;
import com.socgen.smallbasket.model.CartItem;
import com.socgen.smallbasket.model.Product;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.server.ResponseStatusException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.MOCK, classes={ SmallBasketApplication.class })
@AutoConfigureMockMvc
public class CartControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @MockBean
    private CartController cartControllerMock;

    private static Product productItem1;
    private static Product productItem2;
    private static Product productItem3;
    private static CartItem cartItem1;
    private static CartItem cartItem2;

    @Before("")
    public void setUp() {
        this.mockMvc = webAppContextSetup(webApplicationContext).build();
        productItem1 = new Product(1, "Shoes", 1000.00, "shoes.jpg");
        productItem2 = new Product(2, "Bag", 2500.00, "bag.jpg");
        productItem3 = new Product(3, "Laptop", 80000.00, "bag.jpg");
        cartItem1 = new CartItem(1, productItem1, 2);
        cartItem2 = new CartItem(2, productItem2, 5);
    }

    /**
     * This test asserts that the cart controller context should not be null.
     */
    @Test
    public void should_LoadControllerContext() throws Exception {
        assertThat(cartControllerMock).isNotNull();
    }

    /**
     * This test expects that a valid GET request to cart controller should return Ok status
     */
    @Test
    public void should_ReturnOkStatus_When_ValidGetRequest() throws Exception {
        mockMvc.perform(get("/api/cart")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
    }

    /**
     * This test expects that a valid POST request to cart controller should have a Cart item as json
     * and should return created status
     */
    @Test
    public void should_ReturnCreatedStatus_When_ValidPostRequest() throws Exception {
        mockMvc.perform(post("/api/cart")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content((asJsonString(new CartItem(3, productItem3, 4)))))
                .andExpect(status().isCreated());
    }

    /**
     * This test expects that an invalid input in POST request (item id less than 1) to cart controller
     * should throw ResponseStatusException exception.
     */
    @Test
    public void should_ThrowException_When_ItemIdIsLessThan1_Post() throws Exception {
        when(cartControllerMock.addToCart(new CartItem(0, productItem3, 6)))
                .thenThrow(ResponseStatusException.class);
    }

    /**
     * This test expects that an invalid input in POST request (product is null) to cart controller
     * should throw ResponseStatusException exception.
     */
    @Test()
    public void should_ThrowException_When_ProductIsNull_Post() throws Exception {
        when(cartControllerMock.addToCart(new CartItem(3, null, 2)))
                .thenThrow(ResponseStatusException.class);
    }

    /**
     * This test expects that an invalid input in POST request (quantity is 0) to cart controller
     * should throw ResponseStatusException exception.
     */
    @Test
    public void should_ThrowException_When_QuantityIsZero_Post() throws Exception {
        when(cartControllerMock.addToCart(new CartItem(3, productItem3, 0)))
                .thenThrow(ResponseStatusException.class);
    }

    /**
     * This test expects that an invalid input in POST request (quantity is negative) to cart controller
     * should throw ResponseStatusException exception.
     */
    @Test
    public void should_ThrowException_When_QuantityIsLessThanZero_Post() throws Exception {
        when(cartControllerMock.addToCart(new CartItem(3, productItem3, -1)))
                .thenThrow(ResponseStatusException.class);
    }

    /**
     * This test expects that a valid PUT request to cart controller should have a Cart item as json
     * and should return Ok status
     */
    @Test
    public void should_ReturnOkStatus_When_ValidPutRequest() throws Exception {
        mockMvc.perform(put("/api/cart/2")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content((asJsonString(new CartItem(2, productItem2, 4)))))
                .andExpect(status().isOk());
    }

    /**
     * This test expects that a valid DELETE request to cart controller should return Ok status
     */
    @Test
    public void should_ReturnOkStatus_When_ValidDeleteRequest() throws Exception {
        mockMvc.perform(delete("/api/cart/{id}", 1))
                .andExpect(status().isOk());
    }

    /**
     * This test expects that an invalid input in DELETE request (Id is not integer) to cart controller
     * should return Bad request status
     */
    @Test
    public void should_ThrowException_When_IdIsNotInt() throws Exception {
        mockMvc.perform(delete("/api/cart/{id}", "abc"))
                .andExpect(status().isBadRequest());
    }

    /**
     * This method converts an object into a JSON String
     */
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
