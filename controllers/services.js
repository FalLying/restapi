const Service = require("../models/Service");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Service.list()
      .then((result) => res.send(result))
      .catch((error) => res.status(400).send(error));
  });
  app.get("/atendimentos/:id", (req, res) => {
    const { id } = req.params;
    Service.get(id)
      .then((result) => res.send(result))
      .catch((error) => res.status(400).send(error));
  });
  app.post("/atendimentos", (req, res) => {
    const params = req.body;
    Service.add(params)
      .then((result) => res.send(result))
      .catch((error) => res.status(400).send(error));
  });
  app.patch("/atendimentos/:id", (req, res) => {
    const data = req.body;
    const { id } = req.params;
    Service.update(data, id)
      .then((result) => res.send(result))
      .catch((error) => res.status(400).send(error));
  });
  app.delete("/atendimentos/:id", (req, res) => {
    const { id } = req.params;
    Service.delete(id)
      .then((result) => res.send(id))
      .catch((error) => res.status(400).send(error));
  });
};
