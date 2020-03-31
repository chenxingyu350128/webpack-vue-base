import Vue from "vue"
import App from "./App.vue"
import Vuetify from "./plugins/vuetify"
import router from "./router/index"

new Vue({
  vuetify: new Vuetify(),
  router,
  render: h => h(App)
}).$mount("#app");
