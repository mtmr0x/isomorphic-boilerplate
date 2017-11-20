import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Helmet from 'react-helmet';

let IS_FIRST_MOUNT_AFTER_LOAD = true;

export default function connectApp(Container, actionCreators = []) {
  class DataFetchersWrapper extends Component {
    static fetchData({
      dispatch,
      params = {},
      query = {},
      clientInfo = {},
    }) {
      return axios.all(
        actionCreators.map(actionCreator => dispatch(actionCreator({ params, query, clientInfo }))),
      );
    }

    componentDidMount() {
      if (!IS_FIRST_MOUNT_AFTER_LOAD) {
        this._fetchDataOnClient();
      }

      IS_FIRST_MOUNT_AFTER_LOAD = false;
    }

    componentDidUpdate(prevProps) {
      const { location } = this.props;
      const { location: prevLocation } = prevProps;

      const isUrlChanged = (location.pathname !== prevLocation.pathname)
                        || (location.search !== prevLocation.search);

      if (isUrlChanged) {
        this._fetchDataOnClient();
      }
    }

    _fetchDataOnClient() {
      DataFetchersWrapper.fetchData({
        dispatch: this.props.dispatch,
        params: this.props.params,
        query: this.props.location.query,
      });
    }

    render() {
      return (
        <div>
          <Helmet>
            <meta name="description" content="Empty" />
            <meta name="keywords" content="Empty" />

            <title>Titulo</title>
          </Helmet>
          <Container {...this.props} />
        </div>
      );
    }
  }

  DataFetchersWrapper.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object,
    location: PropTypes.object,
  };

  return DataFetchersWrapper;
}

