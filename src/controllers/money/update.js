const Money = require("../../models/Money");

class UpdateMoneyController {
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { amount, description, category, status } = req.body;

      const money = await Money.findByIdAndUpdate(
        id,
        { amount, description, category },
        { new: true }
      );

      return res.json(money);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = UpdateMoneyController;
