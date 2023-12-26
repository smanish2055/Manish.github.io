CREATE TABLE Customers (
    customerid SERIAL PRIMARY KEY,
    customername VARCHAR(100),
    contactname VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(100),
    postalcode VARCHAR(20),
    country VARCHAR(100)
);

