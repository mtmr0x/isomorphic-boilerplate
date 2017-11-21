import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const App = ({ example = {} }) => {
  console.log(example);
  return (
    <div>
      {JSON.stringify(example)}
      <Link to="/list" href="/list">list</Link>
    </div>
  );
};

App.propTypes = {
  example: PropTypes.object,
};

export default App;

