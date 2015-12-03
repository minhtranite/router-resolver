import React from 'react';
import RoutingContext from 'react-router/lib/RoutingContext';
import createElement from './createElement';

const filterAndFlattenComponents = (components) => {
  let flattened = [];
  const iterator = (component) => {
    if (component.resolve) {
      flattened.push(component);
    }
  };
  components.forEach(component => {
    if (typeof component === 'object') {
      for (let key in component) {
        iterator(component[key]);
      }
    } else {
      iterator(component);
    }
  });
  return flattened;
};

const arrayDiff = (previous, next) => {
  let diff = [];
  for (let i = 0; i < next.length; i++) {
    if (previous.indexOf(next[i]) === -1) {
      diff.push(next[i]);
    }
  }
  return diff;
};

const shallowEqual = (a, b) => {
  let key;
  let ka = 0;
  let kb = 0;

  for (key in a) {
    if (a.hasOwnProperty(key) && a[key] !== b[key]) {
      return false;
    }
    ka++;
  }

  for (key in b) {
    if (b.hasOwnProperty(key)) {
      kb++;
    }
  }

  return ka === kb;
};

const last = (arr) => {
  return arr[arr.length - 1];
};

class RouterResolver extends React.Component {
  static propTypes = {
    components: React.PropTypes.array.isRequired,
    params: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    renderInitial: React.PropTypes.func,
    onError: React.PropTypes.func
  };

  static defaultProps = {
    renderInitial: () => {
      return null;
    },
    onError: (error) => {
      throw error;
    }
  };

  state = {
    resolving: false,
    resolveError: false,
    prevProps: null,
    componentsResponses: null
  };

  static childContextTypes = {
    resolver: React.PropTypes.object
  };

  getChildContext() {
    return {
      resolver: {
        resolving: this.state.resolving,
        componentsResponses: this.state.componentsResponses
      }
    };
  };

  componentDidMount() {
    const { components, params } = this.props;
    this.resolve(components, params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location === this.props.location) {
      return;
    }

    const oldComponents = filterAndFlattenComponents(this.props.components);
    const newComponents = filterAndFlattenComponents(nextProps.components);

    let components = arrayDiff(oldComponents, newComponents);

    if (newComponents.length !== 0 && components.length === 0) {
      const sameComponents = shallowEqual(oldComponents, newComponents);
      if (sameComponents) {
        const paramsChanged = !shallowEqual(nextProps.params, this.props.params);
        if (paramsChanged) {
          components = [last(newComponents)];
        }
      }
    }

    this.resolve(components, nextProps.params);
  };

  resolve(components, params) {
    this.setState({
      resolving: true,
      prevProps: this.props
    });

    let componentsResponses = {};
    let resolveComponents = filterAndFlattenComponents(components);

    let promises = resolveComponents.map(resolveComponent => resolveComponent.resolve(params));
    Promise.all(promises).then(responses => {
      componentsResponses = {
        components: resolveComponents,
        responses: responses
      };
      this.setState({
        resolving: false,
        resolveError: false,
        prevProps: null,
        componentsResponses: componentsResponses
      });
    }, error => {
      this.setState({
        resolving: false,
        resolveError: true
      });
      this.props.onError(error);
    });
  }

  render() {
    const { componentsResponses, resolving, resolveError, prevProps } = this.state;
    if (!componentsResponses) {
      return this.props.renderInitial();
    }
    let props = resolving || resolveError ? prevProps : this.props;
    let params = this.props.params || {};
    // todo: Other way to pass resolving to Router component.
    params.resolving = this.state.resolving;
    return (
      <RoutingContext {...props} params={params} createElement={createElement}/>
    );
  }
}

export default RouterResolver;
