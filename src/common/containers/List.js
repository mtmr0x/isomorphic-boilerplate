import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import connectApp from './../lib/connectApp';

import exampleAction from './../actions/example';

const App = ({ example = {} }) => (<div>{JSON.stringify(example)}</div>);

App.propTypes = {
  example: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    example: state.exampleReducer,
  };
}

export default connect(mapStateToProps)(connectApp(App, [exampleAction]));

