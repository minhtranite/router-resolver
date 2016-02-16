# Router Resolver

A custom `RouterContext` for `React Router` to resolve data (data loading) use `Promise`.
 
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
import {RouterResolver} from 'router-resolver';
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

const renderInitial = () => {
  return <div>Loading...</div>;
};

const onError = (error) => {
  console.log('Error: ', error);
};

ReactDOM.render(
  <Router routes={routes}
    history={history}
    render={props => (
      <RouterResolver {...props} renderInitial={renderInitial} onError={onError}/>
    )}/>,
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
- Show `ProgressBar` when resolving (https://github.com/vn38minhtran/router-resolver/blob/master/example/app/components/App.js#L26)

## Demo

View [demo](http://vn38minhtran.github.io/router-resolver) or example folder.
