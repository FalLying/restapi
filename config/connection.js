const mysql = require("mysql");

const connect = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "petshop",
  insecureAuth: true,
});

console.log("senha >> ", process.env.MYSQL_PASSWORD);

module.exports = connect;
