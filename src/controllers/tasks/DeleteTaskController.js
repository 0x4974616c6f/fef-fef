const Task = require("../../models/Task");
const { param, validationResult } = require("express-validator");

module.exports = {
  async index(req, res) {
    await param("id").notEmpty().isMongoId().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;

    await Task.deleteOne({ _id: id });

    return res.json({ message: "Task deleted" });
  },
};
