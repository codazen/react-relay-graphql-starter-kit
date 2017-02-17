import express from 'express';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { secret } from './secret';
import { UserModel } from './data/models/userModel';

const router = express.Router();

router.post('/authenticate', (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.json({ success: false, message: err });
    } else if (!user) {
      res.json({ success: false, message: 'Email not found' });
    }
    user.validatePassword(req.body.password, (error, valid) => {
      if (error) {
        res.json({ success: false, message: error });
      } else if (valid) {
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '1d' }); // eslint-disable-line
        res.setHeader('Set-Cookie', cookie.serialize('access_token', String(token), { httpOnly: true }));
        res.send({
          result: 'YOU GOT A TOKEN',
        });
      } else {
        res.json({ success: false, message: 'Password incorrect' });
      }
    });
  });
});

module.exports = {
  router,
};
