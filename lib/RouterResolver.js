'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var getLocationPath = function getLocationPath(l) {
  return l.pathname + l.search + l.hash;
};

var isLocationChange = function isLocationChange(l1, l2) {
  var p1 = getLocationPath(l1);
  var p2 = getLocationPath(l2);
  return p1 !== p2;
};

var filterAndFlattenComponents = function filterAndFlattenComponents(components) {
  var flattened = [];
  var iterator = function iterator(component) {
    if (component.resolve) {
      flattened.push(component);
    }
  };
  components.forEach(function (component) {
    if (typeof component === 'object') {
      for (var key in component) {
        iterator(component[key]);
      }
    } else {
      iterator(component);
    }
  });
  return flattened;
};

var arrayDiff = function arrayDiff(previous, next) {
  var diff = [];
  for (var i = 0; i < next.length; i++) {
    if (previous.indexOf(next[i]) === -1) {
      diff.push(next[i]);
    }
  }
  return diff;
};

var shallowEqual = function shallowEqual(a, b) {
  var key = undefined;
  var ka = 0;
  var kb = 0;

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

var last = function last(arr) {
  return arr[arr.length - 1];
};

var mergeComponentsResponses = function mergeComponentsResponses(current, changes) {
  current.components = current.components || [];
  current.responses = current.responses || [];
  changes.components = changes.components || [];
  changes.responses = changes.responses || [];

  for (var i = 0; i < changes.components.length; i++) {
    var component = changes.components[i];
    var position = current.components.indexOf(component);
    if (position === -1) {
      current.components.push(changes.components[i]);
      current.responses.push(changes.responses[i]);
    } else {
      current.responses[position] = changes.responses[i];
    }
  }
  return current;
};

var RouterResolver = (function (_React$Component) {
  _inherits(RouterResolver, _React$Component);

  function RouterResolver() {
    _classCallCheck(this, RouterResolver);

    _get(Object.getPrototypeOf(RouterResolver.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      resolving: false,
      resolveError: false,
      prevProps: null,
      componentsResponses: null
    };
  }

  _createClass(RouterResolver, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        resolver: {
          componentsResponses: this.state.componentsResponses
        }
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var components = _props.components;
      var params = _props.params;

      this.resolve(components, params);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!isLocationChange(nextProps.location, this.props.location)) {
        return;
      }

      var oldComponents = filterAndFlattenComponents(this.props.components);
      var newComponents = filterAndFlattenComponents(nextProps.components);

      var components = arrayDiff(oldComponents, newComponents);

      if (newComponents.length !== 0 && components.length === 0) {
        var sameComponents = shallowEqual(oldComponents, newComponents);
        if (sameComponents) {
          var paramsChanged = !shallowEqual(nextProps.params, this.props.params);
          if (paramsChanged) {
            components = [last(newComponents)];
          }
        }
      }

      this.resolve(components, nextProps.params);
    }
  }, {
    key: 'resolve',
    value: function resolve(components, params) {
      var _this = this;

      this.setState({
        resolving: true,
        prevProps: this.props
      });

      var componentsResponses = this.state.componentsResponses || {};
      var resolveComponents = filterAndFlattenComponents(components);

      var promises = resolveComponents.map(function (resolveComponent) {
        return resolveComponent.resolve(params);
      });
      Promise.all(promises).then(function (responses) {
        var changes = {
          components: resolveComponents,
          responses: responses
        };
        componentsResponses = mergeComponentsResponses(componentsResponses, changes);
        _this.setState({
          resolving: false,
          resolveError: false,
          prevProps: null,
          componentsResponses: componentsResponses
        });
      }, function (error) {
        _this.setState({
          resolving: false,
          resolveError: true
        });
        _this.props.onError(error);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var componentsResponses = _state.componentsResponses;
      var resolving = _state.resolving;
      var resolveError = _state.resolveError;
      var prevProps = _state.prevProps;

      if (!componentsResponses) {
        return this.props.renderInitial();
      }
      var props = resolving || resolveError ? prevProps : this.props;
      props.router.resolving = resolving;
      return this.props.render(props);
    }
  }], [{
    key: 'propTypes',
    value: {
      components: _react2['default'].PropTypes.array.isRequired,
      params: _react2['default'].PropTypes.object.isRequired,
      location: _react2['default'].PropTypes.object.isRequired,
      renderInitial: _react2['default'].PropTypes.func,
      render: _react2['default'].PropTypes.func,
      onError: _react2['default'].PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      renderInitial: function renderInitial() {
        return null;
      },
      render: function render(props) {
        return _react2['default'].createElement(_reactRouter.RouterContext, _extends({}, props, { createElement: _createElement2['default'] }));
      },
      onError: function onError(error) {
        throw error;
      }
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      resolver: _react2['default'].PropTypes.object
    },
    enumerable: true
  }]);

  return RouterResolver;
})(_react2['default'].Component);

exports['default'] = RouterResolver;
module.exports = exports['default'];