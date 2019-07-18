DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cheese", "food", 2.50, 100);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("mouthwash", "personal", 7.50, 100);
INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("mascara", "beauty", 12.50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("deoderant","personal", 4.50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fuji apple","food", 1.50, 100);
INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("t-shirt","clothing", 10.50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("socks","clothing", 6.50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("camera","electronics", 800.50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chicken","food", 8.50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shampoo","personal", 15.50, 100);

