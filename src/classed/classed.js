import domElements from './utils/domElements'
import last from './utils/last'
import buildTagFunction from './buildTagFunction'




const classed = (ClassedComponent) => {
  return buildTagFunction.withClassedComponent(ClassedComponent)
}


domElements.forEach(tag => classed[tag] = buildTagFunction.withName(tag))

export default classed