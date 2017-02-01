import domElements from './utils/domElements'
import {createElement, Component} from 'react'

// classed.div`
//  hello
//  love
//  more ${true}
// `

const toResult = props =>
  interpol => typeof interpol === 'function'
  ? interpol(props)
  : interpol

const interpolate = (strings, interpolations = [], props) => {
  const results   = interpolations.map(toResult(props))
  const className = strings.reduce((className, string, i) => className + string + results[i], '')
  return className
}

const ClassedFactory = (tag) => (strings, interpolations) => {

  const className = strings.join(' ')

  return props => {

    const className = interpolate(strings, interpolations, props)
    // const p = {...this.props}
    const p = {className, ...props}
    return createElement(tag, p, p.children)
  }

}

const addTagComponent = (classed, tag) => {
  classed[tag] = ClassedFactory(tag)
}

const Classed = () => {

  const classed = () => {}



  domElements.forEach(addTagComponent.bind(null, classed))

  return classed
}

export default Classed()