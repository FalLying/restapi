class Table {
  init(connection) {
    this.connection = connection;

    this.createTableService();
    this.createTablePet();
  }

  createTableService() {
    const sql =
      "CREATE TABLE IF NOT EXISTS services (id INT NOT NULL AUTO_INCREMENT, client VARCHAR(11) NOT NULL, pet VARCHAR(20), status VARCHAR(20) NOT NULL, service VARCHAR(20) NOT NULL, observations TEXT, created_at datetime NOT NULL, date_service datetime NOT NULL, PRIMARY KEY(id))";

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(">> Tabela atendimentos criada com sucesso.");
      }
    });
  }
  createTablePet() {
    const sql =
      "CREATE TABLE IF NOT EXISTS pets (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, image VARCHAR(50) NOT NULL, PRIMARY KEY(id))";

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(">> Tabela pets criada com sucesso.");
      }
    });
  }
}

module.exports = new Table();
