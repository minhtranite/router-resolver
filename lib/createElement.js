'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RouterResolverContainer = require('./RouterResolverContainer');

var _RouterResolverContainer2 = _interopRequireDefault(_RouterResolverContainer);

var createElement = function createElement(Component, props) {
  return _react2['default'].createElement(_RouterResolverContainer2['default'], { Component: Component, routerProps: props });
};

exports['default'] = createElement;
module.exports = exports['default'];