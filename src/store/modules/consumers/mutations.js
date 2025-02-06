import types from './types.js'

export default {
  [types.SET_CONSUMERS_MUTATION](state, payload) {
    state[types.CONSUMERS_STATE] = payload
  },
}
