CREATE USER 'shoppinghaven'@'localhost' IDENTIFIED BY 'shoppinghaven';
GRANT ALL PRIVILEGES ON * . * TO 'shoppinghaven'@'localhost';
ALTER USER 'shoppinghaven'@'localhost' IDENTIFIED WITH mysql_native_password BY 'shoppinghaven123';