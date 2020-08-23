DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  price DECIMAL (22,2) NOT NULL,
  image VARCHAR(250) NOT NULL
);

INSERT INTO products (name, price, image) VALUES
  ('Laptop', 80000.00, 'laptop.jpg'),
  ('Headphones', 7000.00, 'headphones.jpg'),
  ('Shoes', 3000.00, 'shoes.jpg'),
  ('Bag', 1500.00, 'bag.jpg'),
  ('Dress', 5000.00, 'dress.jpg'),
  ('Sunglasses', 1250.00, 'sunglasses.jpg'),
  ('Chair', 3500.00, 'chair.jpg'),
  ('Table', 8000.00, 'table2.jpg');

CREATE TABLE cart (
  item_id INT AUTO_INCREMENT  PRIMARY KEY,
  product_id INT UNIQUE NOT NULL,
  quantity BIGINT NOT NULL,
  CHECK(quantity > 0),
  CONSTRAINT FK_CART_PRODUCT FOREIGN KEY (product_id) REFERENCES products(id)
);

-- INSERT INTO cart (product_id, quantity) VALUES
--   (1, 1),
--   (5, 2);