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

// use webpack middleware for development
if (process.env.NODE_ENV === 'development') {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config');
  /* eslint-enable global-requir, import/no-extraneous-dependenciese */

  const config = webpackConfig;
  config.devtool = 'source-map';
  config.entry.app.unshift('webpack-hot-middleware/client?reload=true');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true }));
  app.use(webpackHotMiddleware(compiler));
}

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
