const User = require('../../models/User');

module.exports = {
    async detail(req, res) {
        const user_id = req.user_id

        const user = await User.findOne({ _id: user_id });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        return res.json(user);
    }
}