const Money = require('../../models/Money');

class CreateMoneyController {
  static async create(req, res) {
    try {
      const { amount, description, category, status } = req.body;
      const money = await Money.create({ amount, description, category, status });
      return res.json(money);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = CreateMoneyController;
