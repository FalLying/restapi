const connection = require("../infra/database/connection");
const moment = require("moment");
const axios = require("axios");
const repository = require("../repositories/service");

class Service {
  constructor() {
    this.isValidDate = (date_service, created_at) =>
      moment(date_service).isSameOrAfter(created_at);
    this.isValidClient = (client) => client.length >= 5;
    this.isValid = (params) =>
      this.validations.filter((item) => {
        const { field } = item;
        const param = params[field];

        return !item.valid(param);
      });
    this.validations = [
      {
        field: "client",
        valid: this.isValidClient,
        error: "O nome do cliente deve ter no mínimo 11 caracteres.",
      },
      {
        filed: "date_service",
        valid: this.isValidDate,
        error:
          "A data do atendimento deve ser maior ou igual a data de abertura.",
      },
    ];
  }

  add(data) {
    const created_at = moment().format("YYYY-MM-DD");
    const date_service = moment(data.date_service, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );

    const params = {
      date_service: { date_service, created_at },
      client: { length: data.client.length },
    };

    const error = this.isValid(params);
    const isError = error.length;

    if (isError) {
      return new Promise((resolve, reject) => reject(error));
    } else {
      const handleService = { ...data, created_at, date_service };

      return repository.add(handleService).then((result) => {
        const id = result.insertId;
        return { ...data, id };
      });
    }
  }

  list() {
    return repository.list();
  }

  get(id) {
    return repository.get(id).then(async (result) => {
      const service = result[0];
      const cpf = service.client;
      const { data } = await axios.get(`http://localhost:8082/${cpf}`);
      service.client = data;
      return service;
    });
  }

  update(data, id) {
    data.date_service = moment(data.date_service, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    return repository.update([data, id]).then((result) => data);
  }

  delete(id) {
    return repository.delete(id);
  }
}

module.exports = new Service();
