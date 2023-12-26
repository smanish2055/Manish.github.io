CREATE TABLE Employees (
    employeeid SERIAL PRIMARY KEY,
    lastname VARCHAR(50),
    firstname VARCHAR(50),
    birthdate TIMESTAMP,
    photo varchar(20),
    notes TEXT
);
