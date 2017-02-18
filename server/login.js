/* @flow */

import express from 'express';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import uuidV4 from 'uuid/v4'; // eslint-disable-line
import { secret } from './secret';
import { UserModel } from './data/models/userModel';

const router = express.Router();

router.post('/authenticate', (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.json({ success: false, message: err });
    } else if (!user) {
      res.json({ success: false, message: 'Email not found' });
    } else {
      user.validatePassword(req.body.password, (error, valid) => {
        if (error) {
          res.json({ success: false, message: error });
        } else if (valid) {
          // const xsrfToken = uuidV4();
          const xsrfToken = '74e022ca-5b2e-480c-9fc4-a24555f1c11a';
          const token = jwt.sign({ userID: user._id, xsrfToken }, secret, { expiresIn: '1d' }); // eslint-disable-line
          const httpOnlyCookie = cookie.serialize('access_token', String(token), { httpOnly: true });
          const xsrfCookie = cookie.serialize('xsrf_token', String(xsrfToken));
          res.setHeader('Set-Cookie', [httpOnlyCookie, xsrfCookie]);
          res.send({
            result: 'YOU GOT A TOKEN',
          });
        } else {
          res.json({ success: false, message: 'Password incorrect' });
        }
      });
    }
  });
});

module.exports = {
  router,
};
