import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NoProductImage from "../../resources/NoProductImage.jpg";

/* Interface for a Product Type Object */
interface ProductObject {
  id: number;
  name: string;
  price: number;
  image: string;
}

/* Interface for Props for ProductCard component */
interface Props {
  product: ProductObject;
  onAddToCart: (product: ProductObject, quantity: number) => void;
  addToCartDisabled: boolean;
}

const ProductCard = (props: Props) => {
  const { product, onAddToCart, addToCartDisabled } = props;
  const [quantity, setQuantity] = useState(1);

  let imgSrc = "";
  try {
    /* Try loading the product image from the resources using the image name fetched from server */
    imgSrc = require(`../../resources/${product.image}`);
  } catch (e) {
    /* If there's an error loading image, use a dummy No Image */
    imgSrc = NoProductImage;
  }

  /**
   * This function decrements the quantity counter state
   */
  const decrementQuantity = () => {
    /* Minimum quantity is 1 */
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  /**
   * This function increments the quantity counter state
   */
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Card>
      <CardMedia
        style={{ height: 0, paddingTop: "60%" }}
        image={imgSrc}
        title={product.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {product.name}
        </Typography>
        <Typography component="p">
          <b>Price: Rs. {product.price}</b>
        </Typography>
        <div style={{ marginTop: "7px" }}>
          <span>
            <Button variant="outlined" onClick={decrementQuantity}>
              {" "}
              -{" "}
            </Button>
          </span>
          <span
            style={{
              margin: "3px 10px 0 10px",
            }}
          >
            Quantity: <b>{quantity}</b>
          </span>
          <span>
            <Button variant="outlined" onClick={incrementQuantity}>
              {" "}
              +{" "}
            </Button>
          </span>

          <Button
            disabled={addToCartDisabled}
            style={{ float: "right" }}
            size="small"
            color="primary"
            onClick={() => {
              onAddToCart(product, quantity);
            }}
          >
            <b>Add to Cart</b>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
