const connection = require("../config/connection");
const moment = require("moment");

class Service {
  add(service, res) {
    const created_at = moment().format("YYYY-MM-DD");
    const date_service = moment(service.date_service, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );

    const isValidDate = moment(date_service).isSameOrAfter(created_at);
    const isValidClient = service.client.length >= 5;

    const validations = [
      {
        field: "client",
        valid: isValidClient,
        error: "O nome do cliente deve ter no mínimo 5 caracteres.",
      },
      {
        filed: "date_service",
        valid: isValidDate,
        error:
          "A data do atendimento deve ser maior ou igual a data de abertura.",
      },
    ];

    const error = validations.filter((field) => !field.valid);
    const isError = error.length;

    if (isError) {
      res.status(400).send(error);
    } else {
      const handleService = { ...service, created_at, date_service };
      const sql = "INSERT INTO services SET ?";

      connection.query(sql, handleService, (error, result) => {
        if (error) {
          res.status(400).send(error);
        } else {
          const id = result.insertId;
          res.status(200).send({ ...service, id });
        }
      });
    }
  }

  list(res) {
    const sql = "SELECT * FROM services";

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(result);
      }
    });
  }

  get(req, res) {
    const sql = `SELECT * FROM services WHERE id = ?`;

    connection.query(sql, req.params.id, (error, result) => {
      if (error) {
        res.status(404).send(error);
      } else {
        res.status(200).send(result[0]);
      }
    });
  }

  update(req, res) {
    const sql = "UPDATE services SET ? WHERE id = ?";
    const { id } = req.params;

    connection.query(sql, [req.body, id], (error, result) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send({ ...req.body, id });
      }
    });
  }

  delete(req, res) {
    const sql = "DELETE FROM services WHERE id = ?";

    connection.query(sql, req.params.id, (error, result) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send(result);
      }
    });
  }
}

module.exports = new Service();
