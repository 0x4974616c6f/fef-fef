const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // limit each IP to 100 requests per windowMs
});

const express = require("express");
const isAuthenticated = require("./middlewares/isAuthenticated");

const AuthUserController = require("./controllers/user/AuthUserController");
const CreateUserController = require("./controllers/user/CreateUserController");
const DetailUserController = require("./controllers/user/DetailUserController");
const IsAdminController = require("./controllers/user/IsAdminController");

const CreateTaskController = require("./controllers/tasks/CreateTaskController");
const DeleteTaskController = require("./controllers/tasks/DeleteTaskController");
const ListAllTaskController = require("./controllers/tasks/ListAllTaskController");
const ListByIdTaskController = require("./controllers/tasks/ListByIdTaskController");
const ListByUserIdTaskController = require("./controllers/tasks/ListByUserIdTaskController");
const UpdateTaskController = require("./controllers/tasks/UpdateTaskController");

const {
  employee_create,
  employee_delete,
  employee_getAll,
  employee_getOne,
  employee_update,
} = require("./controllers/employees");

const router = express.Router();

router.get('/admin', limiter, isAuthenticated, IsAdminController.index);
router.post("/users", limiter, CreateUserController.create);
router.post("/session", limiter, AuthUserController.auth);
router.get(
  "/me",
  limiter,
  isAuthenticated,
  limiter,
  DetailUserController.detail
);

router.post(
  "/tasks",
  limiter,
  isAuthenticated,
  limiter,
  CreateTaskController.index
);
router.get(
  "/tasks/all",
  limiter,
  isAuthenticated,
  limiter,
  ListAllTaskController.index
);
router.get(
  "/tasks/:id",
  limiter,
  isAuthenticated,
  limiter,
  ListByIdTaskController.index
);
router.get(
  "/tasks/user/:user_id",
  limiter,
  isAuthenticated,
  limiter,
  ListByUserIdTaskController.index
);
router.put(
  "/tasks/:id",
  limiter,
  isAuthenticated,
  limiter,
  UpdateTaskController.index
);
router.delete(
  "/tasks/:id",
  limiter,
  isAuthenticated,
  limiter,
  DeleteTaskController.index
);
router.put(
  "/tasks/done/:id",
  limiter,
  isAuthenticated,
  limiter,
  UpdateTaskController.done
);

router.get("/employees", limiter, isAuthenticated, limiter, employee_getAll);
router.get(
  "/employees/:id",
  limiter,
  isAuthenticated,
  limiter,
  employee_getOne
);
router.post("/employees", limiter, isAuthenticated, limiter, employee_create);
router.put(
  "/employees/:id",
  limiter,
  isAuthenticated,
  limiter,
  employee_update
);
router.delete(
  "/employees/:id",
  limiter,
  isAuthenticated,
  limiter,
  employee_delete
);

module.exports = {routerRecursosHumanos: router, limiter};
