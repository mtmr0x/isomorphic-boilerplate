import React from 'react';
import { Route, Switch } from 'react-router';

import App from './../containers/App';

export default (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="*" render={() => <h1>Page Not Found</h1>} />
  </Switch>
);

