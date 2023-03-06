const { body, validationResult } = require("express-validator");
const Task = require("../../models/Task");
const User = require("../../models/User");

module.exports = {
  async index(req, res) {
    await body("title").notEmpty().isString().run(req);
    await body("description").optional().isString().run(req);
    await body("done").notEmpty().isBoolean().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, done } = req.body;

    const user_id = req.user_id;

    const user = await User.findOne({ _id: user_id });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const task = await Task.create({
      title,
      description,
      done,
      user_id,
      user_name: user.name,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return res.json(task);
  },
};
