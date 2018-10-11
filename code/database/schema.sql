CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
    item_id int NOT NULL AUTO_INCREMENT,
    product_name varchar(255) NOT NULL,
    department_name varchar(255) NOT NULL,
    price decimal(10,2) NOT NULL,
    product_quantity int NOT NULL,
    PRIMARY KEY (item_id)
);