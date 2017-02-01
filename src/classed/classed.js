import domElements from './utils/domElements'
import ClassedFactory from './ClassedFactory'


const addTagComponent = (classed, tag) => {
  classed[tag] = ClassedFactory(tag)
}

const Classed = () => {

  const classed = () => {}

  domElements.forEach(addTagComponent.bind(null, classed))

  return classed
}

export default Classed()