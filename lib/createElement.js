'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RouterResolverContainer = require('./RouterResolverContainer');

var _RouterResolverContainer2 = _interopRequireDefault(_RouterResolverContainer);

var createElement = function createElement(Component, props) {
  // todo: Other way to pass resolving to Router component.
  var resolving = props.params.resolving;
  var params = Object.assign({}, props.params);
  delete params.resolving;
  return Component.resolve ? _react2['default'].createElement(_RouterResolverContainer2['default'], { Component: Component,
    routerProps: props,
    params: params,
    resolving: resolving }) : _react2['default'].createElement(Component, _extends({}, props, { params: params, resolving: resolving }));
};

exports['default'] = createElement;
module.exports = exports['default'];