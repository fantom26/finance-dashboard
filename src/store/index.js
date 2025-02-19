import { createStore } from 'vuex'
import consumersModule from './modules/consumers'
import types from '@/store/modules/consumers/types.js'

const store = createStore({
  modules: {
    [types.CONSUMERS_MODULE]: consumersModule,
  },
  strict: !import.meta.env.PROD,
})

export default store
