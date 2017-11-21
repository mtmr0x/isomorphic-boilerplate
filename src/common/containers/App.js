import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import connectApp from './../lib/connectApp';
import App from './../components/App';

import exampleAction from './../actions/example';

const AppContainer = props => (<App {...props} />);

AppContainer.propTypes = {
  example: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    example: state.exampleReducer,
  };
}

export default connect(mapStateToProps)(connectApp(AppContainer, [exampleAction]));

