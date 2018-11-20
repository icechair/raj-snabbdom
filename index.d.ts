import { init } from 'snabbdom'
import { VNode } from 'snabbdom/vnode'

export interface Dispatch {
  (message): void
}
type State = any
export interface Effect {
  (dispatch: Dispatch): void
}
export type Change = (State | Effect)[]
export interface Patch {
  (oldVnode: VNode | Element, vnode: VNode): Vnode
}

export interface Render {
  (next: string | VNode | VNode[]): VNode
}
export interface Program {
  init: Change
  update: (message: Message, model: State) => State
  view: (model: State, dispatch) => string | VNode | VNode[]
}
export const display: ((selector: string, patch: Patch) => Render)
export const program: (render: Render, createApp: () => Program) => Program
