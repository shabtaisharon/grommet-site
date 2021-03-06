import React, { Component } from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import { Watcher } from '../Router';

const CONFIG = {
  trackerId: 'UA-99690204-1',
  debug: false,
};

class Analytics extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { path } = nextProps;
    if (path !== prevState.path) {
      return { path };
    }
    return null;
  }

  state = {}

  componentDidMount() {
    const { trackerId, ...config } = CONFIG;
    ReactGA.initialize(trackerId, { ...config });
  }

  componentDidUpdate() {
    const { path } = this.props;
    ReactGA.set({ page: path });
    ReactGA.pageview(path);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

Analytics.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string,
};

Analytics.defaultProps = {
  path: undefined,
};

export default props => (
  <Watcher>{path => <Analytics path={path} {...props} />}</Watcher>
);
