import types from './types.js'

export default {
  [types.CONSUMERS_STATE](state) {
    return state[types.CONSUMERS_STATE]
  },
  [types.HAS_CONSUMERS_STATE](_, getters) {
    return getters[types.CONSUMERS_STATE].length > 0
  },
  [types.TRANSACTION_TYPE_DISTRIBUTION_STATE](state) {
    return state[types.TRANSACTION_TYPE_DISTRIBUTION_STATE]
  },
  [types.TRANSACTION_LOCATION_STATE](state) {
    return state[types.TRANSACTION_LOCATION_STATE]
  },
  [types.CONSUMERS_GENDER_STATE](state) {
    return state[types.CONSUMERS_GENDER_STATE]
  },
}
