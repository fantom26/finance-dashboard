import types from './types.js'
import USER_FIELDS from '@/entities/user.js'

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
      USER_FIELDS.TRANSACTION_TYPE,
      USER_FIELDS.TRANSACTION_AMOUNT,
      countConsumerByTransactionInfo,
    )
  },
  [types.TRANSACTION_LOCATION_STATE](state) {
    return formatData(
      state[types.CONSUMERS_STATE],
      USER_FIELDS.TRANSACTION_LOCATION,
      USER_FIELDS.TRANSACTION_AMOUNT,
      countConsumerByTransactionInfo,
    )
  },
  [types.CONSUMERS_GENDER_STATE](state) {
    return formatData(state[types.CONSUMERS_STATE], USER_FIELDS.GENDER, null, countEntityByProperty)
  },
}

export const getFromConsumerModule = (getterName) => `${types.CONSUMERS_MODULE}/${getterName}`
