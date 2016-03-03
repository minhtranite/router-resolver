import React from 'react';

const lookupResponseForComponent = (Component, componentsResponses) => {
  const { components, responses } = componentsResponses;
  let index = components.indexOf(Component);
  return responses[index];
};

class RouterResolverContainer extends React.Component {
  static propTypes = {
    Component: React.PropTypes.func.isRequired,
    routerProps: React.PropTypes.object.isRequired,
    render: React.PropTypes.func
  };

  static defaultProps = {
    render: (Component, routerProps) => {
      return <Component {...routerProps}/>;
    }
  };

  static contextTypes = {
    resolver: React.PropTypes.object.isRequired
  };

  render() {
    const {Component, routerProps, render} = this.props;
    const {componentsResponses} = this.context.resolver;
    const response = lookupResponseForComponent(Component, componentsResponses);
    if (!!Component.resolve && response === undefined) {
      return null;
    }
    return render(Component, {...routerProps, response});
  }
}

export default RouterResolverContainer;
