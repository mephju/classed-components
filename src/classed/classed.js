import domElements from './utils/domElements'
import last from './utils/last'
import buildTagFunction from './buildTagFunction'




const classed = (ClassedComponent) => {
  return buildTagFunction.withClassedComponent(ClassedComponent)
}

const addTagFn = (acc, tag) => {
  acc[tag] = buildTagFunction.withName(tag)
  return acc
}

domElements.reduce(addTagFn, classed)

export default classed