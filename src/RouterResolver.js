import React from 'react';
import {RouterContext} from 'react-router';
import createElement from './createElement';

const getLocationPath = (l) => {
  return l.pathname + l.search + l.hash;
};

const isLocationChange = (l1, l2) => {
  let p1 = getLocationPath(l1);
  let p2 = getLocationPath(l2);
  return p1 !== p2;
};

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

const mergeComponentsResponses = (current, changes) => {
  current.components = current.components || [];
  current.responses = current.responses || [];
  changes.components = changes.components || [];
  changes.responses = changes.responses || [];

  for (var i = 0; i < changes.components.length; i++) {
    let component = changes.components[i];
    let position = current.components.indexOf(component);
    if (position === -1) {
      current.components.push(changes.components[i]);
      current.responses.push(changes.responses[i]);
    } else {
      current.responses[position] = changes.responses[i];
    }
  }
  return current;
};

class RouterResolver extends React.Component {
  static propTypes = {
    components: React.PropTypes.array.isRequired,
    params: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    renderInitial: React.PropTypes.func,
    render: React.PropTypes.func,
    onError: React.PropTypes.func
  };

  static defaultProps = {
    renderInitial: () => {
      return null;
    },
    render: (props) => {
      return <RouterContext {...props} createElement={createElement}/>;
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
        componentsResponses: this.state.componentsResponses
      }
    };
  };

  componentDidMount() {
    const { components, params } = this.props;
    this.resolve(components, params);
  }

  componentWillReceiveProps(nextProps) {
    if (!isLocationChange(nextProps.location, this.props.location)) {
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

    let componentsResponses = this.state.componentsResponses || {};
    let resolveComponents = filterAndFlattenComponents(components);

    let promises = resolveComponents.map(resolveComponent => resolveComponent.resolve(params));
    Promise.all(promises).then(responses => {
      let changes = {
        components: resolveComponents,
        responses: responses
      };
      componentsResponses = mergeComponentsResponses(componentsResponses, changes);
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
    props.router.resolving = resolving;
    return this.props.render(props);
  }
}

export default RouterResolver;
