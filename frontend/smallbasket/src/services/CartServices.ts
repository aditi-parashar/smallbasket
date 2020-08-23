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
