const query = require("../infra/database/queries");

class Service {
  add(params) {
    const sql = "INSERT INTO services SET ?";
    return query(sql, params);
  }

  list() {
    const sql = "SELECT * FROM services";
    return query(sql);
  }

  get(params) {
    const sql = `SELECT * FROM services WHERE id = ?`;
    return query(sql, params);
  }

  update(params) {
    const sql = "UPDATE services SET ? WHERE id = ?";
    return query(sql, params);
  }

  delete(params) {
    const sql = "DELETE FROM services WHERE id = ?";
    return query(sql, params);
  }
}

module.exports = new Service();
