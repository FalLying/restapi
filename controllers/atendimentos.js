const Service = require("../models/Service");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Service.list(res);
  });
  app.get("/atendimentos/:id", (req, res) => {
    Service.get(req, res);
  });
  app.post("/atendimentos", (req, res) => {
    Service.add(req.body, res);
  });
  app.patch("/atendimentos/:id", (req, res) => {
    Service.update(req, res);
  });
  app.delete("/atendimentos/:id", (req, res) => {
    Service.delete(req, res);
  });
};
