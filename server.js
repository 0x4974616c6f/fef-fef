const server = require("./src/app");

server.listen(process.env.PORT, () => {
  console.log(`Running in ${process.env.BASE}`);
});
