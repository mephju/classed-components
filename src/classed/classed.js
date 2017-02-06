import domElements from './utils/domElements'
import last from './utils/last'
import buildTagFunction from './buildTagFunction'


// const MyComponent = classed.div`
//   hello ${props => props.needsDefault}
//   hello2
//   ${props => 'hello2'}
//   ${p => p.needsDefault ? 'hello' : 'hello2'}
// `

// const MyComponent2 = classed(MyComponent)`
//   evenMoreClasses
//   yeah
// `
// const MyComponent3 = classed(MyComponent2)`moooore`
//




const classed = (ClassedComponent) => {
  return buildTagFunction.withClassedComponent(ClassedComponent)
}


domElements.forEach(tag => classed[tag] = buildTagFunction.withName(tag))

export default classed