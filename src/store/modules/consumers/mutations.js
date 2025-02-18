import types from './types.js'

export default {
  [types.SET_CONSUMERS_MUTATION](state, payload) {
    state[types.CONSUMERS_STATE] = payload
  },
  [types.UPDATE_CONSUMER_MUTATION](state, updatedConsumer) {
    const index = state[types.CONSUMERS_STATE].findIndex((c) => c.id === updatedConsumer.id)

    if (index !== -1) {
      state[types.CONSUMERS_STATE].splice(index, 1, updatedConsumer)
    }
  },
  [types.DELETE_CONSUMER_MUTATION](state, updatedConsumer) {
    const index = state[types.CONSUMERS_STATE].findIndex((c) => c.id === updatedConsumer.id)

    if (index !== -1) {
      state[types.CONSUMERS_STATE].splice(index, 1)
    }
  },
}
