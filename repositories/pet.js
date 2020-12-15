const query = require("../infra/database/queries");

class Pet {
  add(params) {
    const sql = "INSERT INTO pets SET ?";
    return query(sql, params);
  }
}

module.exports = new Pet();
