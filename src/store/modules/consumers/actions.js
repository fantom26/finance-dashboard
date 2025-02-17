import types from './types.js'
import { ConsumersService } from '@/api/consumers.js'

export default {
  async [types.LOAD_CONSUMERS_ACTION]({ commit }) {
    const response = await ConsumersService.fetchConsumers()

    commit(types.SET_CONSUMERS_MUTATION, response.data)
  },

  async [types.UPDATE_CONSUMER_INFO_ACTION]({ commit }, payload) {
    const response = await ConsumersService.updateConsumer(payload)

    if (response.status === 200) {
      commit(types.UPDATE_CONSUMER_MUTATION, response.data)
    }
  },
}
