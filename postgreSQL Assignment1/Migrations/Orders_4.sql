CREATE TABLE Orders (
  orderid serial PRIMARY KEY,
  customerid INT NOT NULL,
  employeeid INT NOT NULL,
  orderdate DATE,
  shipperid INT
);

