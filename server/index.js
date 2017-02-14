/* @flow */

import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import IsomorphicRouter from 'isomorphic-relay-router';
import ReactDOMServer from 'react-dom/server';
import { match } from 'react-router';
import Relay from 'react-relay';
import { schema } from './data/schema';
import routes from '../app/routes';

const PORT = process.env.PORT || 8080;
const app = express();

app.use('/graphql', graphQLHTTP({ schema, pretty: true, graphiql: true }));
app.use(express.static('public'));

// serve isomorphic app
app.use((req, res, next) => {
  // must use absolute url for network layer
  const networkLayer = new Relay.DefaultNetworkLayer(
    `http://localhost:${PORT}/graphql`,
  );

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    const render = ({ data, props }) => {
      const reactOutput = ReactDOMServer.renderToString(
        IsomorphicRouter.render(props),
      );
      res.render(path.resolve(__dirname, 'views', 'index.ejs'), {
        preloadedData: data,
        reactOutput,
      });
    };

    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      IsomorphicRouter.prepareData(renderProps, networkLayer)
        .then(render)
        .catch(next);
    } else {
      res.status(404).send('Not Found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
