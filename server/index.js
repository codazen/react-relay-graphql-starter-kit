/* @flow */

import express from 'express';
import graphQLHTTP from 'express-graphql';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import expressJWT from 'express-jwt';
import cookie from 'cookie';
import bodyParser from 'body-parser';
import path from 'path';
import { schema } from './data/schema';
import { secret } from './secret';
import { router } from './login';


const PORT = process.env.PORT || 8080;
const MONGODB = process.env.MONGO || 'mongodb://localhost:27017/react-relay-graphql';
mongoose.connect(MONGODB, () => {
  console.log(`MongoDB connected at ${MONGODB}`); // eslint-disable-line no-console
});

const app = express();

app.use(bodyParser());

app.use('/', router);

const authenticator = expressJWT({
  secret,
  getToken: (req) => {
    if (req.headers.origin.split('//')[1] === req.headers.referer.split('//')[1].split('/')[0]) {
      const cookies = cookie.parse(req.headers.cookie || '');
      let xsrfToken = '';
      if (cookies.access_token) {
        xsrfToken = jwt.decode(cookies.access_token, { complete: true }).payload.xsrfToken;
      }
      if (xsrfToken === req.headers['x-xsrf-token']) {
        return cookies.access_token;
      }
    }
    return '';
  },
}).unless({ path: ['/graphiql'] });

const tokenCheck = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.clearCookie('xsrf_token');
    res.clearCookie('access_token');
    next(err);
  }
  next();
};

app.use('/graphql', [authenticator, tokenCheck], graphQLHTTP({ schema, pretty: true, graphiql: true }));

app.use(express.static('public'));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
