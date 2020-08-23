import React, { Component } from "react";
import Products from "../products/Products";
import Cart from "../cart/Cart";
import { getProductsService } from "../../services/ProductServices";
import {
  getCartContentService,
  addToCartService,
  updateCartService,
  deleteFromCartService,
} from "../../services/CartServices";

/* Interface for a Cart Item Type Object */
interface CartItemObject {
  id: any;
  product: ProductObject;
  quantity: number;
}

/* Interface for a Product Type Object */
interface ProductObject {
  id: number;
  name: string;
  price: number;
  imageName: string;
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

  /**
   * This function calls an API service
   * to add a new item to the cart; Updates the state
   * @param {object} newCartItem is the new item which needs to be added in the cart.
   */
  addToCart = (newCartItem: CartItemObject) => {
    /* Set the 'addToCartInProgress' flag to true for the PUT request */
    /* To disable the Add to Cart button till the PUT request is resolved */
    /* This is to avoid multiple PUT requests going to the backed for the same item. */
    this.setState({
      addToCartInProgress: true,
    });
    addToCartService(newCartItem)
      .then((data) => {
        const { cartContent } = this.state;
        const newCartContent = [...cartContent];
        newCartContent.push(data);
        this.setState({
          cartContent: newCartContent,
          addToCartInProgress: false,
        });
      })
      .catch((error) => {
        this.setState({
          addToCartInProgress: false,
        });
      });
  };

  /**
   * This function calls an API service
   * to update an existing item in the cart; Updates the state
   * @param {object} updatedCartItem is the cart item which needs to be updated.
   */
  updateCart = (updatedCartItem: CartItemObject) => {
    updateCartService(updatedCartItem)
      .then((data) => {
        const { cartContent } = this.state;
        const newCartContent = [...cartContent];

        /* Find the index of the old item */
        const index = newCartContent.findIndex((item) => item.id === data.id);

        /* Replace the index data with the updated item */
        newCartContent[index] = data;

        /* Update state with the new data */
        this.setState({
          cartContent: newCartContent,
        });
      })
      .catch((error) => {});
  };

  /**
   * This function handles all 'Add to Cart' requests from the product card.
   * @param {object} product is the product which is being added.
   * @param {number} quantity is the selected quantity.
   */
  handleAddToCartClick = (product: ProductObject, quantity: number) => {
    const { cartContent } = this.state;

    /* Search if the added product already exists in the cart */
    const result = cartContent.filter((item) => {
      return item.product.id === product.id;
    });

    if (result.length > 0) {
      /* If the product exists in the cart */
      const updatedCartItem = {
        id: result[0].id,
        product: result[0].product,
        quantity: result[0].quantity + quantity,
      };

      /* Update the cart to reflect the new quantity in an existing item */
      this.updateCart(updatedCartItem);
    } else {
      /* If the product is not found in the cart */
      let itemId = 0;
      if (cartContent.length === 0) {
        itemId = 1;
      } else {
        itemId = cartContent[cartContent.length - 1].id + 1;
      }
      const newCartItem = {
        id: itemId,
        product,
        quantity,
      };

      /* Add the product in the cart as a new item */
      this.addToCart(newCartItem);
    }
  };

  /**
   * This function handles all 'Remove' requests from the Cart item actions.
   * It calls the API service to remove an item from the cart and updates the state.
   * @param {number} id is the id of the item which needs to be removed from the cart.
   */
  handleDeleteFromCart = (id: number) => {
    deleteFromCartService(id)
      .then(() => {
        const { cartContent } = this.state;

        /* Include all items to the new data except the deleted one */
        const newCartContent = cartContent.filter((item) => {
          return item.id !== id;
        });

        /* Update the state with the new data */
        this.setState({
          cartContent: newCartContent,
        });
      })
      .catch((error) => {});
  };

  /**
   * This function handles all 'Decrement Quantity by 1' requests from the Cart item actions.
   * @param {object} item is the the item which needs to be updated in the cart.
   */
  handleDecrement = (item: CartItemObject) => {
    /* Update the quantity in the new data */
    const updatedCartItem = {
      id: item.id,
      product: item.product,
      quantity: item.quantity - 1,
    };

    /* Update the cart to reflect the new quantity in an existing item */
    this.updateCart(updatedCartItem);
  };

  /**
   * This function handles all 'Increment Quantity by 1' requests from the Cart item actions.
   * @param {object} item is the the item which needs to be updated in the cart.
   */
  handleIncrement = (item: CartItemObject) => {
    /* Update the quantity in the new data */
    const updatedCartItem = {
      id: item.id,
      product: item.product,
      quantity: item.quantity + 1,
    };

    /* Update the cart to reflect the new quantity in an existing item */
    this.updateCart(updatedCartItem);
  };

  render() {
    const { cartContent, productsList, addToCartInProgress } = this.state;
    return (
      <>
        <div className="jumbotron">
          <Cart
            cartContent={cartContent}
            onRemoveClick={this.handleDeleteFromCart}
            onDecrementClick={this.handleDecrement}
            onIncrementClick={this.handleIncrement}
          />
        </div>
        <div className="jumbotron">
          <Products
            products={productsList}
            onAddToCart={this.handleAddToCartClick}
            addToCartDisabled={addToCartInProgress}
          />
        </div>
      </>
    );
  }
}

export default HomePage;
