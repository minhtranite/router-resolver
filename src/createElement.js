import React from 'react';
import RouterResolverContainer from './RouterResolverContainer';

const createElement = (Component, props) => {
  // todo: Other way to pass resolving to Router component.
  let resolving = props.params.resolving;
  let params = Object.assign({}, props.params);
  delete params.resolving;
  return Component.resolve ? (
    <RouterResolverContainer Component={Component}
      routerProps={props}
      params={params}
      resolving={resolving}/>
  ) : <Component {...props} params={params} resolving={resolving}/>;
};

export default createElement;
