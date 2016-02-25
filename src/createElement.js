import React from 'react';
import RouterResolverContainer from './RouterResolverContainer';

const createElement = (Component, props) => {
  return <RouterResolverContainer Component={Component} routerProps={props}/>;
};

export default createElement;
