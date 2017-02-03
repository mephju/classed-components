'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _domElements = require('./utils/domElements');

var _domElements2 = _interopRequireDefault(_domElements);

var _ClassedFactory = require('./ClassedFactory');

var _ClassedFactory2 = _interopRequireDefault(_ClassedFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// classed.div`
//   hello ${props => props.needsDefault}
//   hello2
//   ${props => 'hello2'}
//   ${p => p.needsDefault ? 'hello' : 'hello2'}
// `

// classed(MyComponent)`
//   evenMoreClasses
//   yeah
// `

var addTagComponent = function addTagComponent(classed, tag) {
  classed[tag] = (0, _ClassedFactory2.default)(tag);
};

var Classed = function Classed() {

  var classed = function classed() {};

  _domElements2.default.forEach(addTagComponent.bind(null, classed));

  return classed;
};

exports.default = Classed();