'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domElements = require('./utils/domElements');

var _domElements2 = _interopRequireDefault(_domElements);

var _last = require('./utils/last');

var _last2 = _interopRequireDefault(_last);

var _buildTagFunction = require('./buildTagFunction');

var _buildTagFunction2 = _interopRequireDefault(_buildTagFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classed = function classed(ClassedComponent) {
  return _buildTagFunction2.default.withClassedComponent(ClassedComponent);
};

_domElements2.default.forEach(function (tag) {
  return classed[tag] = _buildTagFunction2.default.withName(tag);
});

exports.default = classed;