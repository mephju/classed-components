'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var realizeValue = function realizeValue(props) {
  return function (interpol) {
    return typeof interpol === 'function' ? interpol(props) : interpol;
  };
};

var appendClass = function appendClass(results) {
  return function (classes, string, i) {
    return classes + string + (results[i] || '');
  };
};

var buildClassName = function buildClassName(strings) {
  var interpolations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var props = arguments[2];

  var realizations = interpolations.map(realizeValue(props));
  var reduceToClass = appendClass(realizations);
  return strings.reduce(reduceToClass, props.className);
};

var ClassedFactory = function ClassedFactory(tag) {
  return function (strings) {
    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var ClassedComponent = function ClassedComponent(props) {

      var className = buildClassName(strings, interpolations, props);
      // const p = {...this.props}
      return (0, _react.createElement)(tag, _extends({ className: className }, props), props.children);
    };

    return ClassedComponent;
  };
};

exports.default = ClassedFactory;