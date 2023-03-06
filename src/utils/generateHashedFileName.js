const crypto = require("crypto");

function generateHashedFileName(originalFileName) {
  // Criar um objeto de hash
  const hash = crypto.createHash("sha256");

  // Alimentar o hash com o nome original do arquivo
  hash.update(originalFileName);

  // Gerar o hash em formato hexadecimal
  const hexHash = hash.digest("hex");

  // Gerar um novo nome de arquivo com o hash
  const extension = "jpeg";
  const hashedFileName = `${hexHash}.${extension}`;

  // Retornar o nome do arquivo com o hash
  return hashedFileName;
}
module.exports = generateHashedFileName;
