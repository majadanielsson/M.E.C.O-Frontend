import Vue from 'vue'
import api from '@/plugins/api';
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import App from './App.vue'
import router from './router'

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.use(Chartkick.use(Chart))

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);
Chartkick.options = {
  colors: ["#61599d"],
}
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(api);
Vue.config.productionTip = false

new Vue({
  router,
  data: function () {
    return {
      user: null,
    };
  },
  created: function () {
    const user = window.sessionStorage.getItem("user");
    if (user) this.user = JSON.parse(user);
  },
  render: h => h(App)
}).$mount('#app')
