import {createElement} from 'react'

const toResult = props =>
  interpol => typeof interpol === 'function'
  ? interpol(props)
  : interpol

const appendClass = results => (classes, string, i) => classes + string + (results[i] || '')

const buildClassName = (strings, interpolations = [], props) => {
  const realizations        = interpolations.map(toResult(props))
  const reduceToClass       = appendClass(realizations)
  return strings.reduce(reduceToClass, props.className)
}

const ClassedFactory = (tag) => (strings, ...interpolations) => {

  const ClassedComponent = props => {

    const className = buildClassName(strings, interpolations, props)
    // const p = {...this.props}
    return createElement(tag, {className, ...props}, props.children)
  }

  return ClassedComponent

}

export default ClassedFactory

