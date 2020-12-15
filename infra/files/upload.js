const fs = require("fs");
const path = require("path");

module.exports = (data) => {
  const ext = path.extname(data.image);
  const extensions = ["png", "jpeg", "jpg"];
  const isValidImage = extensions.indexOf(ext.substring(1)) !== -1;
  const newDirectory = `./assets/images/${data.name}${ext}`;

  if (isValidImage) {
    fs.createReadStream(data.image).pipe(fs.createWriteStream(newDirectory));
    return { newDirectory };
  } else {
    const error = "A extensão da imagem não é permitida.";
    return { error };
  }
};
