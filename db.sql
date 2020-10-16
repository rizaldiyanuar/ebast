CREATE DATABASE ebast;

--\c into ebast

CREATE TABLE ebast(
    ebast_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);