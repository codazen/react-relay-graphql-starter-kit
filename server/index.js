/* @flow */

import express from 'express';
import graphQLHTTP from 'express-graphql';
import { schema } from './data/schema';

const PORT = process.env.PORT || 8080;
const app = express();

app.use('/graphql', graphQLHTTP({ schema, pretty: true, graphiql: true }));
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
