import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {createHistory} from 'history';
import {Router, useRouterHistory, RouterContext} from 'react-router';
import {RouterResolver, RouterResolverContainer} from 'router-resolver';
import App from 'components/App.js';
import pkg from '../../package.json';
import Spinner from 'components/common/Spinner';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-progress-bar-plus/lib/progress-bar.css';
import 'assets/styles/app.scss';

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    component: require('components/pages/PageHome')
  },
  childRoutes: [
    require('./routes/Example1Route'),
    require('./routes/Example2Route'),
    require('./routes/Example3Route'),
    require('./routes/Example4Route')
  ]
};

const DEV = process && process.env && process.env.NODE_ENV === 'development';
const history = useRouterHistory(createHistory)({
  basename: '/' + (DEV ? '' : pkg.name)
});

const renderInitial = () => {
  return <Spinner isLoading={true} fullScreen={true}/>;
};

const createElement = (Component, props) => {
  return <RouterResolverContainer Component={Component} routerProps={props}/>;
};

const run = () => {
  ReactDOM.render(
    <Router routes={routes}
      history={history}
      renderInitial={renderInitial}
      render={props => (
        <RouterResolver {...props} render={props2 => (
          <RouterContext {...props2}/>
        )}/>
      )}
      createElement={createElement}/>,
    document.getElementById('app')
  );
};

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
