import classed from '../src'
import {shallow} from 'enzyme'
import React from 'react'

const className = element => {
  return element.props().className
}

test('Classed assigns correct classNames', () => {
  const Component1 = classed.div`
    name1
    name2
    name3
  `
  const component1 = shallow(<Component1 /> )

  expect(className(component1)).toEqual('name1 name2 name3')
})

test('Classed renders correct html tag', () => {
  const Component1 = classed.div`name1 name2 name3`
  const Component2 = classed.ul`name1 name2 name3`

  const component1 = shallow(<Component1 />)
  const component2 = shallow(<Component2 />)

  expect(component1.node.type).toEqual('div')
  expect(component2.node.type).toEqual('ul')
})

test('Classed assigns conditional classNames correctly', () => {
  const Component1 = classed.div`
    name1 ${true}
    name2 ${false}
    name3
  `
  const component1 = shallow(<Component1 /> )

  expect(className(component1)).toEqual('name1 name3')
})

test('Classed assigns classes via embeddings', () => {
  const Component1 = classed.div`
    name1
    ${'name2'}
    ${'name3'}
  `
  const component1 = shallow(<Component1 /> )

  expect(className(component1)).toEqual('name1 name2 name3')
})

test('Classed extends classed components', () => {

  const Component1 = classed.div`name1`
  const component1 = shallow(<Component1 /> )

  const Component2 = classed(Component1)`name2`
  const component2 = shallow(<Component2 /> )

  expect(className(component2)).toEqual('name1 name2')
})


test('Classed assigns classes via embeddings but ignores undefined and null', () => {
  const Component1 = classed.div`
    name1
    ${'name2'}
    ${'name3'} ${props => props.undefinedValue}
    ${undefined}
    ${null}
  `
  const component1 = shallow(<Component1 /> )

  expect(className(component1)).toEqual('name1 name2 name3')
})

