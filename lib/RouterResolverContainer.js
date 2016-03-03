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

var lookupResponseForComponent = function lookupResponseForComponent(Component, componentsResponses) {
  var components = componentsResponses.components;
  var responses = componentsResponses.responses;

  var index = components.indexOf(Component);
  return responses[index];
};

var RouterResolverContainer = (function (_React$Component) {
  _inherits(RouterResolverContainer, _React$Component);

  function RouterResolverContainer() {
    _classCallCheck(this, RouterResolverContainer);

    _get(Object.getPrototypeOf(RouterResolverContainer.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(RouterResolverContainer, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var Component = _props.Component;
      var routerProps = _props.routerProps;
      var render = _props.render;
      var componentsResponses = this.context.resolver.componentsResponses;

      var response = lookupResponseForComponent(Component, componentsResponses);
      if (!!Component.resolve && response === undefined) {
        return null;
      }
      return render(Component, _extends({}, routerProps, { response: response }));
    }
  }], [{
    key: 'propTypes',
    value: {
      Component: _react2['default'].PropTypes.func.isRequired,
      routerProps: _react2['default'].PropTypes.object.isRequired,
      render: _react2['default'].PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      render: function render(Component, routerProps) {
        return _react2['default'].createElement(Component, routerProps);
      }
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      resolver: _react2['default'].PropTypes.object.isRequired
    },
    enumerable: true
  }]);

  return RouterResolverContainer;
})(_react2['default'].Component);

exports['default'] = RouterResolverContainer;
module.exports = exports['default'];