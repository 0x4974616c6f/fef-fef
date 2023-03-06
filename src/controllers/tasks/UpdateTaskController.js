const { body, param, validationResult } = require("express-validator");
const Task = require("../../models/Task");

module.exports = {
  async index(req, res) {
    await param("id").notEmpty().isMongoId().run(req);
    await body("title").optional().isString().run(req);
    await body("description").optional().isString().run(req);
    await body("done").optional().isBoolean().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, description, done } = req.body;

    const task = await Task.updateOne(
      { _id: id },
      {
        title,
        description,
        done,
        updated_at: new Date(),
      }
    );

    return res.status(200).end();
  },

  async done(req, res) {
    await param("id").notEmpty().isMongoId().run(req);
    await body("done").notEmpty().isBoolean().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { done } = req.body;

    const task = await Task.updateOne(
      { _id: id },
      {
        done,
        updated_at: new Date(),
      }
    );

    if (!task) {
      return res.status(400).json({ error: "Task not found" });
    }

    return res.status(200).end();
  },
};
