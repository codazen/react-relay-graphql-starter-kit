/* @flow */

import express from 'express';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import uuidV4 from 'uuid/v4'; // eslint-disable-line
import { secret } from './secret';
import { UserModel, addUser } from './data/models/userModel';

const router = express.Router();

/**
 * Endpoint for logging in a user.
 * Returns httpOnly cookie containing signed jwt with userID
 * Returns cookie containing random string for xsrf
 */
router.post('/login', (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(401).send({ success: false, message: err });
    } else if (!user) {
      res.status(401).send({ success: false, message: 'Email not found' });
    } else {
      user.validatePassword(req.body.password, (error, valid) => {
        if (error) {
          res.status(401).send({ success: false, message: error });
        } else if (valid) {
          const xsrfToken = uuidV4();
          const token = jwt.sign({ userID: user._id, xsrfToken }, secret, { expiresIn: '1d' }); // eslint-disable-line
          const httpOnlyCookie = cookie.serialize('access_token', String(token), { httpOnly: true });
          const xsrfCookie = cookie.serialize('xsrf_token', String(xsrfToken));
          res.setHeader('Set-Cookie', [httpOnlyCookie, xsrfCookie]);
          res.send({ success: true, message: 'login success!' });
        } else {
          res.status(401).send({ success: false, message: 'Password incorrect' });
        }
      });
    }
  });
});

/**
 * To log a user out, delete their cookies
 */
router.post('/logout', (req, res) => {
  res.clearCookie('xsrf_token');
  res.clearCookie('access_token');
  res.send({ success: true, message: 'User logged out' });
});

/**
 * Create a new user
 * Returns userID cookie and xsrf cookie
 */
router.post('/create', async (req, res) => {
  const user = await addUser(req.body);
  const xsrfToken = uuidV4();
  const token = jwt.sign({ userID: user._id, xsrfToken }, secret, { expiresIn: '1d' }); // eslint-disable-line
  const httpOnlyCookie = cookie.serialize('access_token', String(token), { httpOnly: true });
  const xsrfCookie = cookie.serialize('xsrf_token', String(xsrfToken));
  res.setHeader('Set-Cookie', [httpOnlyCookie, xsrfCookie]);
  res.status(201).send({ success: true, message: 'login success!' });
});

module.exports = {
  router,
};
