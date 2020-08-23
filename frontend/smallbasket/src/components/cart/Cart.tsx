import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

/* Interface for a Product Type Object */
interface ProductObject {
  id: number;
  name: string;
  price: number;
  imageName: string;
}

/* Interface for a Cart Item Type Object */
interface CartItemObject {
  id: any;
  product: ProductObject;
  quantity: number;
}

/* Interface for Props for class Cart */
interface Props {
  cartContent: CartItemObject[];
  onRemoveClick: (id: number) => void;
  onDecrementClick: (item: CartItemObject) => void;
  onIncrementClick: (item: CartItemObject) => void;
}

/* Interface for State for class Cart */
interface State {}

class Cart extends Component<Props, State> {
  /**
   * This function calculates the price grand total of all cart items
   */
  calculateSubTotal = () => {
    const { cartContent } = this.props;
    let grandTotal = 0;
    for (let item of cartContent) {
      grandTotal += item.product.price * item.quantity;
    }
    return grandTotal;
  };

  render() {
    const {
      cartContent,
      onRemoveClick,
      onDecrementClick,
      onIncrementClick,
    } = this.props;
    return (
      <Grid item xs={12}>
        <h4>Cart Items</h4>
        {cartContent.length > 0 ? (
          <>
            <TableContainer style={{ marginTop: "20px" }} component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>No.</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Product</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Quantity</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Price Per Item (INR)</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Total Price (INR)</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartContent.map((item, index) => {
                    const finalPrice = item.product.price * item.quantity;
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">
                          {item.product.name}
                        </TableCell>
                        <TableCell align="center">
                          <div style={{ marginTop: "7px" }}>
                            <span>
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  item.quantity === 1
                                    ? onRemoveClick(item.id)
                                    : onDecrementClick(item);
                                }}
                              >
                                {" "}
                                -{" "}
                              </Button>
                            </span>
                            <span
                              style={{
                                margin: "3px 10px 0 10px",
                              }}
                            >
                              Quantity: <b>{item.quantity}</b>
                            </span>
                            <span>
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  onIncrementClick(item);
                                }}
                              >
                                {" "}
                                +{" "}
                              </Button>
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {item.product.price}
                        </TableCell>
                        <TableCell align="right">{finalPrice}</TableCell>
                        <TableCell style={{ color: "#f15a4f" }} align="center">
                          <Button
                            color="inherit"
                            size="small"
                            onClick={() => {
                              onRemoveClick(item.id);
                            }}
                          >
                            <b>REMOVE</b>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{ float: "right", marginTop: "20px", marginRight: "10px" }}
            >
              <h5>Subtotal (INR): {this.calculateSubTotal()}</h5>
            </div>
          </>
        ) : (
          <Grid item xs={12}>
            <TableContainer style={{ marginTop: "20px" }} component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>No.</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Product</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Quantity</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Price Per Item</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Final Price</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <b>Your cart is empty.</b>
            </div>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default Cart;
