const jwt = require('jsonwebtoken');

const db = require('../helpers/db');
const { secret } = require('../helpers/config.db.json');

async function authorize(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let userInfo = {};

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    userInfo = jwt.verify(token, secret);
  } catch (e) {
    return res.status(403);
  }

  const user = await db.User.findByPk(userInfo.sub);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = user.get();

  next();
}

module.exports = authorize;
