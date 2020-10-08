import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import { store } from "./store/store"
import Globals from "./globals"
import "bootstrap"

import "./styles/styles.scss"
// import "../public/tokens/themes/web_dark/dark.css"

// Vue.config.productionTip = false

Vue.use(Globals)

new Vue({
  data() {
    return {
      selectedFormat: store.state.selectedFormat
    }
  },
  store,
  router,
  render: h => h(App)
}).$mount("#app")
