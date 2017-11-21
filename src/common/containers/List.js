import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import connectApp from './../lib/connectApp';

import exampleAction from './../actions/example';

const ListContainer = ({ example = {} }) => (
  <div>
    <h1>List</h1>
    {JSON.stringify(example)}
    <Link to="/">Home</Link>
  </div>
);

ListContainer.propTypes = {
  example: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    example: state.exampleReducer,
  };
}

export default connect(mapStateToProps)(connectApp(ListContainer, [exampleAction]));

