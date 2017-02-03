var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { createElement } from 'react';

const realizeValue = props => interpol => typeof interpol === 'function' ? interpol(props) : interpol;

const appendClass = results => (classes, string, i) => classes + string + (results[i] || '');

const buildClassName = (strings, interpolations = [], props) => {
  const realizations = interpolations.map(realizeValue(props));
  const reduceToClass = appendClass(realizations);
  return strings.reduce(reduceToClass, props.className);
};

const ClassedFactory = tag => (strings, ...interpolations) => {

  const ClassedComponent = props => {

    const className = buildClassName(strings, interpolations, props);
    // const p = {...this.props}
    return createElement(tag, _extends({ className }, props), props.children);
  };

  return ClassedComponent;
};

export default ClassedFactory;