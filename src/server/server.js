import express from 'express';
import fs from 'fs';

import bodyParser from 'body-parser';

import * as clientConfig from '../common/config.js';
import * as serverConfig from './config.js';

import appRouting from './appRouting';

import log from './logs';

process.on('uncaughtException', (err) => {
  const parsedError = {};

  Object.getOwnPropertyNames(err).forEach((key) => {
    parsedError[key] = err[key];
  });

  log.error(JSON.stringify({
    message: 'uncaughtException',
    trace: parsedError,
  }));
});

const app = express();

app.get('*/main.js', (req, res, next) => {
  if (serverConfig.env !== 'development') {
    req.url = `${req.url}.gz`; // eslint-disable-line no-param-reassign
    res.set('Content-Encoding', 'gzip');
  }
  next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Cache-Control', 'no-cache, private');

  next();
});

app.use(express.static('public'));

app.use('/fonts', express.static('public/fonts'));

app.use(appRouting);

const PORT = clientConfig.application.port;

const server = app.listen(PORT, () => {
  console.log(`L I S T E N I N G  A T: ${PORT}`); // eslint-disable-line
});

// exports app and server regularly
module.exports = {
  app,
  server,
};

