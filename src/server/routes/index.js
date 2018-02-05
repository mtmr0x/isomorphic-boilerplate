import React from 'react';
import Cookies from 'cookies';
import Helmet from 'react-helmet';
import uaParser from 'ua-parser-js';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { getCookiesMiddleware } from 'redux-cookies';
import { createStore, applyMiddleware, compose } from 'redux';

import log from './../logs';
import renderHTML from './template';
import routes from './../../common/routes';
import fetchComponentsData from './../_utils/http-utils';
import rootReducer from './../../common/reducers';

export default function serverRouting(req, res) {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
    console.log(webpackIsomorphicTools.refresh);
  }

  const context = {};
  const cookies = new Cookies(req, res);
  const store = createStore(
    rootReducer,
    applyMiddleware(getCookiesMiddleware(cookies)),
    compose(
      applyMiddleware(thunkMiddleware),
    )
  );

  const routeList = routes.props.children.filter(_ => _.props.path === req.url);
  const currentRoute = routeList.length ? routeList[0].props : {};
  const currentComponent = currentRoute.component || {};

  fetchComponentsData({
    dispatch: store.dispatch,
    components: [currentComponent],
    params: req.params,
    query: req.query,
  }).then(() => {
    const componentHTML = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          {routes}
        </StaticRouter>
      </Provider>
    );

    const head = Helmet.renderStatic();
    const html = renderHTML(
      componentHTML,
      store.getState(),
      webpackIsomorphicTools.assets(),
      head,
    );

    return { html };
  }).then(({ html }) => {
    if (req.url === '/404') {
      res.status(404).send(html);
      return;
    }

    res.end(html);
    return;
  }).catch(err => {
    log.error(JSON.stringify({
      message: `Request in ${req.location} failed.`,
      response: err,
    }));
  });
}

