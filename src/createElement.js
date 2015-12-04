import React from 'react';
import RouterResolverContainer from './RouterResolverContainer';

const clone = (a) => {
  return JSON.parse(JSON.stringify(a));
};

const createElement = (Component, props) => {
  let params = clone(props.params);
  delete params.resolving;
  let resolving = props.params.resolving;
  return Component.resolve ? (
    <RouterResolverContainer Component={Component}
      routerProps={props}
      params={params}
      resolving={resolving}/>
  ) : <Component {...props} params={params} resolving={resolving}/>;
};

export default createElement;
