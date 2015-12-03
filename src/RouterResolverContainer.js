import React from 'react';

const lookupResponseForComponent = (Component, componentsResponses) => {
  const { components, responses } = componentsResponses;
  let index = components.indexOf(Component);
  return responses[index];
};

class RouterResolverContainer extends React.Component {
  static propTypes = {
    Component: React.PropTypes.func.isRequired,
    routerProps: React.PropTypes.object.isRequired
  };

  static contextTypes = {
    resolver: React.PropTypes.object.isRequired
  };

  render() {
    const { Component, routerProps } = this.props;
    const { componentsResponses} = this.context.resolver;
    const response = lookupResponseForComponent(Component, componentsResponses);
    return response ? <Component{...routerProps} response={response}/> : null;
  }
}

export default RouterResolverContainer;
