package com.socgen.smallbasket;

import com.socgen.smallbasket.controller.ProductsController;
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

import java.lang.reflect.Array;
import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.MOCK, classes={ SmallBasketApplication.class })
@AutoConfigureMockMvc
public class ProductsControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @MockBean
    private ProductsController productsControllerMock;

    private static Product productItem1;
    private static Product productItem2;

    @Before("")
    public void setUp() {
        this.mockMvc = webAppContextSetup(webApplicationContext).build();
        productItem1 = new Product(1, "Laptop", 80000.00, "laptop.jpg");
        productItem2 = new Product(2, "Bag", 2500.00, "bag.jpg");
    }

    /**
     * This test asserts that the products controller context should not be null.
     */
    @Test
    public void should_LoadProductsControllerContext() throws Exception {
        assertThat(productsControllerMock).isNotNull();
    }

    /**
     * This test expects that a valid GET request to products controller should return Ok status
     */
    @Test
    public void should_ReturnOkStatus_When_Products_ValidGetRequest() throws Exception {
        mockMvc.perform(get("/api/products")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
    }
}
