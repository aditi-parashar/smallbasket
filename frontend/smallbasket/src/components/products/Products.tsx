import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ProductCard from "./ProductCard";

/* Interface for a Product Type Object */
interface ProductObject {
  id: number;
  name: string;
  price: number;
  imageName: string;
}

/* Interface for Props for class ProductsList */
interface Props {
  products: ProductObject[];
  onAddToCart: (product: ProductObject, quantity: number) => void;
  addToCartDisabled: boolean;
}

class ProductsList extends Component<Props> {
  render() {
    const { products, onAddToCart, addToCartDisabled } = this.props;
    return (
      <div>
        {products.length > 0 ? (
          <div>
            <h4>Our Products</h4>
            <Grid container spacing={7} style={{ padding: 20 }}>
              {products.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} lg={4} xl={3}>
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    addToCartDisabled={addToCartDisabled}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <div>
            <h3>Loading products...</h3>
          </div>
        )}
      </div>
    );
  }
}

export default ProductsList;
