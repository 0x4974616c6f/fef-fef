require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");

const apiRoutes = require("./router");

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.DATABASE);
}
// mongoose.set('strictQuery', false)
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (err) => {
  console.error(`Error: ${err.message}`);
});

const server = express();

server.use(cors());
server.use(express.json({ limit: "10mb" }));
server.use(express.urlencoded({ limit: "10mb", extended: true }));
server.use(fileUpload());
server.use(morgan("dev"));

// server.use(express.static(__dirname + "/public"));
server.use("/public", express.static("public"));

server.use("/", apiRoutes);

module.exports = server;