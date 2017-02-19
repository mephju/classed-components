'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _last = require('./utils/last');

var _last2 = _interopRequireDefault(_last);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DEBUG = window.process && window.process.env && window.process.env.DEBUG;

var realizeEmbedding = function realizeEmbedding(props) {
  return function (embedding) {
    if (typeof embedding === 'function') {
      embedding = embedding(props);
    }
    if (typeof embedding === 'string') {
      embedding = normalize(embedding);
    }
    return embedding;
  };
};

var normalize = function normalize(string) {
  return string.replace(/\s+/g, ' ').trim();
};

var appendClass = function appendClass(realizations) {
  return function (classes, className, i) {
    var realization = realizations[i];

    if (typeof realization === 'boolean') {
      // omit className when false
      return realization ? classes + ' ' + className : classes;
    }

    return classes + ' ' + className + ' ' + (realization || '');
  };
};

var buildClassName = function buildClassName(classes) {
  var embeddings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var props = arguments[2];

  var realizations = embeddings.map(realizeEmbedding(props));
  var append = appendClass(realizations);
  var className = classes.reduce(append, props.className || '');
  return normalize(className);
};

var buildTagFunction = {
  withName: function withName(tag) {

    return function (strings) {
      for (var _len = arguments.length, embeddings = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        embeddings[_key - 1] = arguments[_key];
      }

      DEBUG && console.log('withName strings', strings);
      DEBUG && console.log('withName embed  ', embeddings);

      var TagComponent = function TagComponent(props) {

        var className = buildClassName(strings, embeddings, props);
        return (0, _react.createElement)(tag, _extends({ className: className }, props), props.children);
      };

      TagComponent._classed = { tag: tag, strings: strings, embeddings: embeddings };

      return TagComponent;
    };
  },
  withClassedComponent: function withClassedComponent(ClassedComponent) {
    var _classed = ClassedComponent._classed;
    var tag = _classed.tag;

    var parentStrings = _classed.strings;
    var parentEmbeddings = _classed.embeddings;

    var lastString = (0, _last2.default)(parentStrings).trim();

    if (lastString === '') parentStrings.pop();
    if (parentStrings.length > parentEmbeddings.length) {
      parentEmbeddings.push('');
    }

    return function (strings) {
      for (var _len2 = arguments.length, embeddings = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        embeddings[_key2 - 1] = arguments[_key2];
      }

      var buildTagComponent = buildTagFunction.withName(tag);

      return buildTagComponent.apply(undefined, [parentStrings.concat(strings)].concat(_toConsumableArray(parentEmbeddings.concat(embeddings))));
    };
  }
};

exports.default = buildTagFunction;