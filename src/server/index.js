import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';

import WebpackIsomorphicToolsConfig from './../../webpack/webpack-isomorphic-tools';
import * as clientConfig from '../common/config.js';
import * as serverConfig from './config.js';

import routes from './routes';
import log from './logs';

dotenv.config();

/* GLOBALS */
// TODO: move all this global values to config file using dotenv to access it
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
// __DEVELOPMENT__ is used for enabling development tools in server side
// TODO: move it to config file
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';

const rootDir = path.resolve(__dirname, '../../');
const app = express();
app.use(express.static('public'));

app.use('/fonts', express.static('public/fonts'));

app.use(routes);

const PORT = clientConfig.application.port;

const server = app.listen(PORT, () => {
  log.info(`L I S T E N I N G  A T: ${PORT}`);
});

global.webpackIsomorphicTools = new WebpackIsomorphicTools(WebpackIsomorphicToolsConfig)
  .server(rootDir, () => server);

