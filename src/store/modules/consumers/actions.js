import types from './types.js'
import axios from 'axios'

export default {
  async [types.LOAD_CONSUMERS_ACTION]({ commit }) {
    const response = await axios.get('http://localhost:3000/customers')

    commit(types.SET_CONSUMERS_MUTATION, response.data)
  },
}
