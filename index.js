const { h } = require('snabbdom/h')
var { toVNode } = require('snabbdom/tovnode')
/**
 * @param {string} selector query selector with tag eg `div#root` instead of just `#root`
 * @param {Patch} patch patch function returned by `snabbdom.init()`
 * @returns {Render} render function which takes the next viewdata and patches the virtual dom
 */
const display = (selector, patch) => {
  let root
  if (typeof document !== 'undefined') {
    root = toVNode(document.querySelector(selector))
    return next => {
      root = patch(root, h(selector, next))
      return root
    }
  }
  return next => next
}

/**
 *
 * @param {Render} render render function
 * @param {Patch} patch patch function returned by `snabbdom.init()`
 * @param {() => Program} createApp
 */
const program = (render, createApp) => {
  const app = createApp()
  const { view, done } = app
  return {
    ...app,
    view: (state, dispatch) => render(view(state, dispatch)),
    done: () => {
      if (done) {
        done()
      }
      render()
    }
  }
}

module.exports = { display, program }
