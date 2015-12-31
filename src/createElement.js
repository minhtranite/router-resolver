import React from 'react';
import RouterResolverContainer from './RouterResolverContainer';

const createElement = (Component, props) => {
  return Component.resolve
    ? <RouterResolverContainer Component={Component} routerProps={props}/>
    : <Component {...props}/>;
};

export default createElement;
