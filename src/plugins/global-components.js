import BaseContainer from '@/components/base/BaseContainer.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseDialog from '@/components/base/BaseDialog.vue'

export default {
  install(app) {
    app.component('base-container', BaseContainer)
    app.component('base-button', BaseButton)
    app.component('base-dialog', BaseDialog)
  },
}
