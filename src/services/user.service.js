const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../helpers/config.db.json');
const db = require('../helpers/db');

async function authenticate({ email, password }) {
  const user = await db.User.scope('withHash').findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.hash))) {
    throw 'Email or password is incorrect';
  }

  // authentication successful
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '5d' });
  user.token = token;
  await user.save();

  return { ...omitHash(user.get()), token };
}

async function create(params) {
  if (await db.User.findOne({ where: { email: params.email } })) {
    throw 'Email "' + params.email + '" is already taken';
  }

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  await db.User.create(params);
}

async function unauthenticate(id) {
  const user = await db.User.findByPk(id);

  if (!user) {
    throw 'User not found';
  }

  user.token = null;
  await user.save();

  return user;
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}

module.exports = {
  authenticate,
  create,
  unauthenticate
};
