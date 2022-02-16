const express = require('express');
const router = express.Router();

const validateRequest = require('../middleware/validate-request');
const userService = require('../services/user.service');
const createUserSchema = require('../schemas/create-user-schema');
const authSchema = require('../schemas/auth-schema');

// routes
router.post('/', validateRequest(createUserSchema), register);
router.post('/auth', validateRequest(authSchema), authenticate);
router.get('/:id/unauth', unauthenticate);

async function authenticate(req, res, next) {
  try {
    const user = await userService.authenticate(req.body);

    res.status(200).json({
      success: true,
      user: { ...user }
    });
  } catch (e) {
    return next(e);
  }
}

async function register(req, res, next) {
  try {
    await userService.create(req.body);
  } catch (e) {
    return next(e);
  }

  res.status(201).json({
    success: true,
    msg: 'Registration successful'
  });
}

async function unauthenticate(req, res, next) {
  try {
    await userService.unauthenticate(req.params.id);
  } catch (e) {
    return next(e);
  }

  res.status(204).end();
}

module.exports = router;
