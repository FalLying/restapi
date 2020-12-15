const connection = require("../infra/database/connection");
const upload = require("../infra/files/upload");
const repository = require("../repositories/pet");

class Pet {
  add(data) {
    const fileUploaded = upload(data);

    if (fileUploaded) {
      if (fileUploaded.error) {
        return new Promise((resolve, reject) => reject(error));
      } else {
        const newPet = { name: data.name, image: fileUploaded.newDirectory };
        return repository.add(newPet).then((result) => {
          const id = result.insertId;
          return { ...newPet, id };
        });
      }
    }
  }
}

module.exports = new Pet();
