const Task = require("../../models/Task");
const { param, validationResult } = require("express-validator");
module.exports = {
  async index(req, res) {
    await param("user_id").notEmpty().isMongoId().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user_id } = req.params;

    const tasks = await Task.find({ user_id });

    return res.json(tasks);
  },
};
