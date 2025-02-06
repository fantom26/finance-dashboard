import types from './types.js'

export default {
  [types.CONSUMERS_STATE](state) {
    return state[types.CONSUMERS_STATE]
  },
  [types.HAS_CONSUMERS_STATE](_, getters) {
    return getters[types.CONSUMERS_STATE].length > 0
  },
}
