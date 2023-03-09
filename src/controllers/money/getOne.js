const Money = require('../../models/Money');

class GetOneMoneyController {
  static async get(req, res) {
    try {
      const { id } = req.params;
      const money = await Money.findById(id);
      if (!money) {
        return res.status(404).json({ error: 'Money not found' });
      }
      return res.json(money);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = GetOneMoneyController;
