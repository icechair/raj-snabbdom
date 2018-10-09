const test = require('tape')
const { JSDOM } = require('jsdom')
const { init, h } = require('snabbdom')
const dom = new JSDOM(
  `<!DOCTYPE html><html><body><div id="root"></div></body></html>`
)
global.document = dom.window.document

const { display, program } = require('../index')

const patch = init([])

test(`display/render test`, t => {
  const selector = 'div#root'
  const render = display(selector, patch)
  t.equal(typeof render, 'function', '`display` should return a function')
  const root = document.querySelector(selector)
  render('hello world')
  t.equal(root.innerHTML, 'hello world', '`render` should modify the dom')
  render()
  t.equal(root.innerHTML, '', 'empty `render` should clear the dom')
  t.end()
})

test('program test', t => {
  t.plan(5)
  const selector = 'div#root'
  const app = {
    init: [0],
    update: () => [],
    view: state => [h('p', `state is ${state}`)]
  }
  let prog = program(selector, patch, () => app)
  t.deepEqual(
    Object.keys(prog),
    ['init', 'update', 'view', 'done'],
    '`program` should return a raj program'
  )
  const root = document.querySelector(selector)
  prog.view(13)
  t.equal(
    root.children.length,
    1,
    '`prog.view` should render the vnode into the dom'
  )
  t.equal(
    root.children[0].innerHTML,
    'state is 13',
    '`prog.view` should should render the state'
  )
  prog.done()
  t.equal(root.innerHTML, '', '`proc.done` should tear down the app dom')
  const withDone = { ...app, done: () => t.pass('done should be triggered') }
  prog = program(selector, patch, () => withDone)
  prog.done()
})
