CREATE TABLE Orderdetails (
    orderdetailid SERIAL PRIMARY KEY,
    orderid INT,
    productid INT,
    quantity INT
);

