import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseButton from '@/components/base/BaseButton.vue'

export default {
  install(app) {
    app.component('base-container', BaseContainer)
    app.component('base-button', BaseButton)
  },
}
