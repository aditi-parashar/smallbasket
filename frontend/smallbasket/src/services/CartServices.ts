import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * API Service to get all cart items
 */
export const getCartContentService = async () => {
  return axios
    .get(`${API_URL}/cart/`, {
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
export const addToCartService = async (itemDetails: any) => {
  return axios
    .post(`${API_URL}/cart/`, itemDetails, {
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
export const updateCartService = async (itemDetails: any) => {
  return axios
    .put(`${API_URL}/cart/${itemDetails.id}`, itemDetails, {
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
export const deleteFromCartService = async (id: number) => {
  return axios
    .delete(`${API_URL}/cart/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response;
    });
};
