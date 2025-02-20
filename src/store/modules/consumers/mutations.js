import types from './types.js'

function findConsumerIndex(state, id) {
  return state[types.CONSUMERS_STATE].findIndex((c) => c.id === id)
}

export default {
  [types.SET_CONSUMERS_MUTATION](state, payload) {
    state[types.CONSUMERS_STATE] = payload
  },
  [types.UPDATE_CONSUMER_MUTATION](state, updatedConsumer) {
    const index = findConsumerIndex(state, updatedConsumer.id)

    if (index !== -1) {
      state[types.CONSUMERS_STATE][index] = updatedConsumer
    }
  },
  [types.DELETE_CONSUMER_MUTATION](state, { id }) {
    const index = findConsumerIndex(state, id)

    if (index !== -1) {
      state[types.CONSUMERS_STATE].splice(index, 1)
    }
  },
}
