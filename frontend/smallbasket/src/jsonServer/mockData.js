const products = [
  {
    id: 1,
    name: "Laptop",
    price: 80000,
    imageName: "laptop.jpg",
  },
  {
    id: 2,
    name: "Headphones",
    price: 7000,
    imageName: "headphones.jpg",
  },
  {
    id: 3,
    name: "Shoes",
    price: 3000,
    imageName: "shoes.jpg",
  },
  {
    id: 4,
    name: "Bag",
    price: 1500,
    imageName: "bag.jpg",
  },
  {
    id: 5,
    name: "Dress",
    price: 5000,
    imageName: "dress.jpg",
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 1250,
    imageName: "sunglasses.jpg",
  },
  {
    id: 7,
    name: "Chair",
    price: 3500,
    imageName: "chair.jpg",
  },
  {
    id: 8,
    name: "Table",
    price: 8000,
    imageName: "table.jpg",
  },
];

const cartItems = [
  { itemId: 1, productId: 1, quantity: 1 },
  { itemId: 2, productId: 3, quantity: 4 },
];

module.exports = {
  products,
  cartItems,
};
