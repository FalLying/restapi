require("dotenv").config();
const customExpress = require("./config/customExpress");
const connection = require("./config/connection");
const Table = require("./models/Table");

const app = customExpress();

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("🔥 Database was connected.");
    Table.init(connection);
    app.listen(3000, () => {
      console.log("🔥 Server started listening at port 3000.");
    });
  }
});
