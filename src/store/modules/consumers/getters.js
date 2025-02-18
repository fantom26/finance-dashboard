import types from './types.js'
import {
  countConsumerByTransactionInfo,
  countEntityByProperty,
  formatData,
} from '@/utils/helpers.js'

export default {
  [types.CONSUMERS_STATE](state) {
    return state[types.CONSUMERS_STATE]
  },
  [types.HAS_CONSUMERS_STATE](_, getters) {
    return getters[types.CONSUMERS_STATE].length > 0
  },
  [types.TRANSACTION_TYPE_DISTRIBUTION_STATE](state) {
    return formatData(
      state[types.CONSUMERS_STATE],
      'transaction_type',
      'transaction_amount',
      countConsumerByTransactionInfo,
    )
  },
  [types.TRANSACTION_LOCATION_STATE](state) {
    return formatData(
      state[types.CONSUMERS_STATE],
      'transaction_location',
      'transaction_amount',
      countConsumerByTransactionInfo,
    )
  },
  [types.CONSUMERS_GENDER_STATE](state) {
    return formatData(state[types.CONSUMERS_STATE], 'gender', null, countEntityByProperty)
  },
}
