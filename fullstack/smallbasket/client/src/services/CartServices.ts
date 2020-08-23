import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * API Service to get all cart items
 */
export const getCartContentService = async () => {
  return axios
    .get(`${API_URL}/cart`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * API Service to add a new item(product) to the cart
 */
export const addToCartService = async (productDetails: any) => {
  return axios
    .post(`${API_URL}/cart`, productDetails, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * API Service to update an existing item(product) to the cart
 */
export const updateCartService = async (itemId: number, quantity: number) => {
  const productDetails = {
    quantity,
  };
  return axios
    .put(`${API_URL}/cart/${itemId}`, productDetails, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * API Service to delete an item(product) from the cart
 */
export const deleteFromCartService = async (itemId: number) => {
  return axios
    .delete(`${API_URL}/cart/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response;
    });
};
