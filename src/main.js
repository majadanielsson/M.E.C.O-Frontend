import Vue from 'vue'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import App from './App.vue'
import router from './router'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  data: function() {
    return {
      user: null
    }
  },
  created: function() {
    const user = window.sessionStorage.getItem("user");
    if (user) this.user = JSON.parse(user);

  },
  render: h => h(App)
}).$mount('#app')