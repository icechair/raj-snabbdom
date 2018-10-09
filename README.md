# Raj Snabbdom

> [Snabbdom](https://github.com/snabbdom/snabbdom) bindings for [Raj](https://github.com/andrejewski/raj)

```sh
npm install raj-snabbdom
```

## Usage

```js
import { init, h } from 'snabbdom'
import { program, display } from 'raj-snabbdom'
import { runtime } from 'raj'

const patch = init(['with snabbdom modules'])
const render = display('div#root', patch)

const helloProgram = {
  init: [{ text: 'hello world' }],
  update: (msg, state) => [state],
  view: (state, dispatch) => h('p', state.text)
}

const app = program(render, () => helloProgram)

runtime(app)
```

## Documentation

```js
program(render, () => Program): Program
```

- `render: (view: VNode) => void` render function which handles the virtual dom interaction
- `init: [state, effect?]` initial State and optional effect
- `update: (message, state) => [state,effect?]` update function which returns new state and optional effect
- `view: (state, dispatch) => VNode` return the snabbdom view representation

`program` takes a render function and a function which returns a Raj program `{init, update, view}` and returns a new program, which updates the virtual dom when `view` is called

```js
display(selector, patch): (view: VNode) => void
```

- `selector` the dom selector of the root element (for example `'div#root'`)
- `patch` a patch function created by `snabbdom.init()`

`display` is an example implementation of a function which creates a render function. it holds internally the reference to `oldNode`
