import {createElement} from 'react'
import last from './utils/last'

var DEBUG = window.process
&& window.process.env
&& window.process.env.DEBUG

const realizeEmbedding = props => embedding => {
  if(typeof embedding === 'function') {
    embedding = embedding(props)
  }
  if(typeof embedding === 'string') {
    embedding = normalize(embedding)
  }
  return embedding
}

const normalize = string => string.replace(/\s+/g, ' ').trim()

const appendClass = realizations => (classes, className, i) => {
  const realization = realizations[i]

  if(typeof realization === 'boolean') {
    // omit className when false
    return realization ? `${classes} ${className}` : classes
  }

  return `${classes} ${className} ${realization || ''}`
}

const buildClassName = (classes, embeddings = [], props) => {
  const realizations = embeddings.map(realizeEmbedding(props))
  const append       = appendClass(realizations)
  const className    = classes.reduce(append, '')
  return normalize(className)
}



const buildTagFunction = {

  withName(tag) {

    return (strings, ...embeddings) => {

      DEBUG && console.log('withName strings', strings)
      DEBUG && console.log('withName embed  ', embeddings)


      const TagComponent = props => {

        const className = buildClassName(strings, embeddings, props)
        return createElement(tag, {className, ...props}, props.children)
      }

      TagComponent._classed = {tag, strings, embeddings}

      return TagComponent
    }

  },

  withClassedComponent(ClassedComponent) {

    const {_classed}           = ClassedComponent
    const {tag}                = _classed
    const parentStrings        = _classed.strings
    const parentEmbeddings     = _classed.embeddings

    const lastString = last(parentStrings).trim()

    if(lastString === '') parentStrings.pop()
    if(parentStrings.length > parentEmbeddings.length) {
      parentEmbeddings.push('')
    }

    return (strings, ...embeddings) => {

      const buildTagComponent = buildTagFunction.withName(tag)

      return buildTagComponent(
        parentStrings.concat(strings),
        ...parentEmbeddings.concat(embeddings)
      )

    }
  }
}

export default buildTagFunction