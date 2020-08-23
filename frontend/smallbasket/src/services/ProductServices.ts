import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * API Service to get all products
 */
export const getProductsService = async () => {
  return axios
    .get(`${API_URL}/products/`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    });
};
