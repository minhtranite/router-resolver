import React from 'react';
import RouterResolverContainer from './RouterResolverContainer';

const clone = (a) => {
  return JSON.parse(JSON.stringify(a));
};

const createElement = (Component, props) => {
  let params = clone(props.params);
  let resolving = params.resolving;
  delete props.params.resolving;
  return Component.resolve ? (
    <RouterResolverContainer Component={Component}
      routerProps={props}
      resolving={resolving}/>
  ) : <Component {...props} resolving={resolving}/>;
};

export default createElement;
