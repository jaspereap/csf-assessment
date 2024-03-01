-- TODO Task 3
CREATE TABLE orders (
    orderId char(26),
    date date,
    name varchar(128),
    address varchar(128),
    priority boolean,
    comments text,
    cart text,
    primary key(orderId)
)