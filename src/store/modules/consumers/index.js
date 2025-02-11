import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import types from './types.js'

export default {
  namespaced: true,
  state() {
    return {
      [types.CONSUMERS_STATE]: [],
      [types.TRANSACTION_TYPE_DISTRIBUTION_STATE]: [],
    }
  },
  mutations,
  getters,
  actions,
}
