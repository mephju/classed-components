import domElements from './utils/domElements'
import React, {PropTypes, Component} from 'react'



const components = domElements.map(tagName => {
  return (...args) => <[tagName]> args[0].children </[tagName]>
})