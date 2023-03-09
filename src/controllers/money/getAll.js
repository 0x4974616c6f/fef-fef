const Money = require('../../models/Money');

class GetAllMoneyController {
  static async index(req, res) {
    try {
      const money = await Money.find();
      return res.json(money);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = GetAllMoneyController;
