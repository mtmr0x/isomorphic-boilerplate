import React from 'react';
import { Route, Switch } from 'react-router';

import App from './../containers/App';
import List from './../containers/List';

export default (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/list" component={List} />
    <Route path="*" render={() => <h1>Page Not Found</h1>} />
  </Switch>
);

