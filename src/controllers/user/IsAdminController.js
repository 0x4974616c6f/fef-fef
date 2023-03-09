const User = require("../../models/User");

module.exports = {
  async index(req, res) {
    const user_id = req.user_id;
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.admin) {
      return res.status(200).json(user);
    }

    return res.status(401).json({ error: "User not authorized" });
  },
};
