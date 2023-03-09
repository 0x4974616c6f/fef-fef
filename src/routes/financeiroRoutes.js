const { limiter } = require("../router");
const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const GetAllMoneyController = require("../controllers/money/getAll");
const GetOneMoneyController = require("../controllers/money/getOne");
const CreateMoneyController = require("../controllers/money/create");
const DeleteMoneyController = require("../controllers/money/delete");
const UpdateMoneyController = require("../controllers/money/update");
const router = express.Router();

router.get("/all", limiter, isAuthenticated, GetAllMoneyController.index);

router.get("/:id", limiter, isAuthenticated, GetOneMoneyController.get);

router.post("/create", limiter, isAuthenticated, CreateMoneyController.create);

router.delete("/:id", limiter, isAuthenticated, DeleteMoneyController.delete);

router.put("/:id", limiter, isAuthenticated, UpdateMoneyController.update);

module.exports = {
  routerFinanceiro: router,
};
