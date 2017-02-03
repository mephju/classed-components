import domElements from './utils/domElements'
import ClassedFactory from './ClassedFactory'


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

const addTagComponent = (classed, tag) => {
  classed[tag] = ClassedFactory(tag)
}

const Classed = () => {

  const classed = () => {}

  domElements.forEach(addTagComponent.bind(null, classed))

  return classed
}

export default Classed()