const Pet = require("../models/Pet");

module.exports = (app) => {
  app.post("/pets", (req, res) => {
    const data = req.body;
    Pet.add(data)
      .then((result) => res.send(result))
      .catch((error) => res.status(400).send(error));
  });
};
