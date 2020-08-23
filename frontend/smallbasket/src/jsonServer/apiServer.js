/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.post("/cart", function (req, res, next) {
  const error = validateCartItem(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = req.body.itemId;
    next();
  }
});

server.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

function validateCartItem(cartItem) {
  if (!cartItem.itemId || cartItem.itemId < 0) return "Item Id is not valid";
  if (!cartItem.productId || cartItem.productId < 0)
    return "Product Id is not valid";
  if (!cartItem.quantity || cartItem.quantity < 1)
    return "Item quantity is not valid";
  return "";
}
