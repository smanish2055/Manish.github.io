CREATE TABLE Products (
  productid serial PRIMARY KEY,
  productname VARCHAR(255) NOT NULL,
  supplierid INT NOT NULL,
  categoryid INT NOT NULL,
  unit VARCHAR(50),
  price NUMERIC(10, 2) NOT NULL
);

