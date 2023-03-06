const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authToken = req.headers['authorization'];

    if (!authToken) return res.status(401).json({ error: 'Token not provided' });

    const [, token] = authToken.split(' ');

    try {
        const { sub } = jwt.verify(token, process.env.JWT_SECRET);
        req.user_id = sub;

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};