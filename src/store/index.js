import {createStore} from 'vuex'
import consumersModule from './modules/consumers'

const store = createStore({
	modules: {
		consumers: consumersModule,
	},
	strict: !import.meta.env.PROD,
})

export default store