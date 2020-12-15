require("dotenv").config();
const customExpress = require("./config/customExpress");
const connection = require("./infra/database/connection");
const Table = require("./infra/database/Table");

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
