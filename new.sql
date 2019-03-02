-- use favorite_db;
-- insert into favorite_foods (food, score)
-- values ("pie", 10);


-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS bamazon;
-- Create a database called programming_db --
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `department_name` varchar(45) NOT NULL,
  `price` DECIMAL(6,2) NOT NULL,
  `stock_quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


insert into products (product_name, department_name, price, stock_quantity)
values ("NES", "Electronics",50.95,5);
insert into products (product_name, department_name, price, stock_quantity)
values ("SNES", "Electronics",65.99,20);
insert into products (product_name, department_name, price, stock_quantity)
values ("n64", "Electronics",70.25,12);
insert into products (product_name, department_name, price, stock_quantity)
values ("ps1", "Electronics",20.65,30);
insert into products (product_name, department_name, price, stock_quantity)
values ("ps2", "Electronics",50.20,15);
insert into products (product_name, department_name, price, stock_quantity)
values ("ps3", "Electronics",100.20,20);
insert into products (product_name, department_name, price, stock_quantity)
values ("dreamcast", "Electronics",60.10,10);
insert into products (product_name, department_name, price, stock_quantity)
values ("genesis", "Electronics",25.50,3);
insert into products (product_name, department_name, price, stock_quantity)
values ("xbox", "Electronics",100.20,5);
insert into products (product_name, department_name, price, stock_quantity)
values ("xbox360", "Electronics",100.20,10);

