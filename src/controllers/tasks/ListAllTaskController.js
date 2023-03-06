const Task = require("../../models/Task");
module.exports = {
  async index(req, res) {
    const tasks = await Task.find().sort({ created_at: -1 });

    return res.json(tasks);
  },
};
