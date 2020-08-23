import React, { Component } from "react";
import { getProductsService } from "../../services/ProductServices";
import { getCartContentService } from "../../services/CartServices";

/* Interface for a Cart Item Type Object */
interface CartItemObject {
  itemId: any;
  productId: number;
  quantity: number;
}

/* Interface for a Product Type Object */
interface ProductObject {
  id: number;
  name: string;
  price: number;
  image: string;
}

/* Interface for Props for class HomePage */
interface Props {}

/* Interface for State for class HomePage */
interface State {
  cartContent: CartItemObject[];
  productsList: ProductObject[];
  addToCartInProgress: boolean;
}

class HomePage extends Component<Props, State> {
  state: State = {
    cartContent: [],
    productsList: [],
    addToCartInProgress: false,
  };

  /* Fetch cart items and products from server upon mounting */
  componentDidMount = () => {
    this.fetchCartContent();
    this.fetchProducts();
  };

  /**
   * This function calls an API service
   * to fetch all cart items from the server
   */
  fetchCartContent = () => {
    getCartContentService()
      .then((data) => {
        this.setState({
          cartContent: data,
        });
      })
      .catch((error) => {});
  };

  /**
   * This function calls an API service
   * to fetch all products from the server
   */
  fetchProducts = () => {
    getProductsService()
      .then((data) => {
        this.setState({
          productsList: data,
        });
      })
      .catch((error) => {});
  };

  render() {
    return (
      <>
        <div className="jumbotron">Home Page</div>
      </>
    );
  }
}

export default HomePage;
