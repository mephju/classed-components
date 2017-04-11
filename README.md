# classed-components
Like [styled-components](https://github.com/styled-components/styled-components) but for classes. 

## Why
When using CSS Frameworks such as [MaterializeCSS](http://materializecss.com/) it is nice to create components out of existing classes from that framework.

classed-components helps you do that in a convenient way.


## How to get started
```bash
npm i --save classed-components
```

```javascript
import classed from 'classed-components'

const Header = classed.div`
    header 
    green
`

const App = props => {
    return <Header />
}
```

## Features
- Create any HTML tag and associate it with classes.
- Overwrite existing *classed componentes* with even more classes.
- Conditional classes: Include or exclude classes based on your props.
- Generate classes via interpolation functions also based on your props.

### Overwrite existing *classed components*
```javascript
import classed from 'classed-components'

const Header = classed.div`
    header 
    green
`
const HeaderBlack = classed(Header)`black col s12`
```

### Conditional classes
You can use include or exclude certain classes based on props or other variables in the current scope. This is a feature you might know from the [classnames module](https://github.com/JedWatson/classnames).
Whenever an embedding/interpolition within the template string returns a boolean it is interpreted as a condition on the preceeding classname. 

```javascript
import classed from 'classed-components'

const large = true

const MyComponent = classed.div`
    header ${props => props.needsHeader} 
    green
    large ${large}
`
```

### Generate classes via interpolation functions
```javascript
import classed from 'classed-components'
const extra = 'col s12 m6'

const Header = classed.div`
    ${props => props.needsHeader ? 'header' : 'box'} 
    green
    ${extra}
`
```






