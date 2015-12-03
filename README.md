# Router Resolver

A custom `RoutingContext` for `React Router` to resolve data (data loading) like `async-props` use `Promise`.
 
## Installation

### NPM

```bash
npm install --save router-resolver
```

### Bower
```bash
bower install --save router-resolver
```

## Usage

```js
// app.js
//...
import Router from 'react-router';
import RouterResolver from 'router-resolver';
import {createHistory} from 'history';
//...
const routes = {
  path: '/',
  component: App,
  indexRoute: {
    component: require('components/pages/PageHome')
  },
  childRoutes: [
    require('./routes/Example1Route'),
    require('./routes/Example2Route'),
    require('./routes/Example3Route')
  ]
};

const history = createHistory();

const renderInitial = () => {
  return <div>Loading...</div>;
};

ReactDOM.render(
  <Router RoutingContext={RouterResolver}
    routes={routes}
    history={history}
    renderInitial={renderInitial}/>,
  document.getElementById('app')
);
```

```js
// components/pages/PageExample1.js
import React from 'react';
import Document from 'components/common/Document';

class PageExample1 extends React.Component {
  static resolve() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('simple data');
      }, 2000);
    });
  };

  static propTypes = {
    response: React.PropTypes.string.isRequired
  };

  render() {
    return (
      <Document title='Example1 | Router resolver' className='page-ex-1'>
        <h1>Example 1: {this.props.response}</h1>
      </Document>
    );
  }
}

export default PageExample1;
```

### Please see example to get more info.

- renderInitial (https://github.com/vn38minhtran/router-resolver/blob/master/example/app/app.js#L35)
- Multiple promise (https://github.com/vn38minhtran/router-resolver/blob/master/example/app/components/pages/PageExample3.js#L5)
- Show `ProgressBar` when resolving (https://github.com/vn38minhtran/router-resolver/blob/master/example/app/components/App.js#L30)

## Demo

View [demo](http://vn38minhtran.github.io/router-resolver) or example folder.
