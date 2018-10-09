const { h } = require('snabbdom')
/**
 * @typedef {import("snabbdom/vnode").VNode} VNode
 * @typedef {(oldNode: VNode | Element, vnode: VNode) => VNode} Patcher
 * @typedef {(next: string| VNode| VNode[]) => void} Renderer
 * @typedef {{init: [], update: () => [], view: () => VNode} Program
 */

/**
 * @param {string} selector query selector with tag eg `div#root` instead of just `#root`
 * @param {Patcher} patch patch function returned by `snabbdom.init()`
 * @returns {Renderer} render function which takes the next viewdata and patches the virtual dom
 */
const display = (selector, patch) => {
  let root = document.querySelector(selector)
  return next => {
    root = patch(root, h(selector, next))
  }
}

/**
 *
 * @param {Renderer} render render function
 * @param {Patcher} patch patch function returned by `snabbdom.init()`
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
