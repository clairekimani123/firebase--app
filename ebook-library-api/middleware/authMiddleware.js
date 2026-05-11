const jwt = require('jsonwebtoken');
const { users } = require('../data/db');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
      req.user = users.find((u) => u.id === decoded.id);
      if (!req.user) throw new Error('User not found');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  res.status(401).json({ message: 'Not authorized, no token' });
};

module.exports = protect;
