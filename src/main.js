import Vue from 'vue'
import api from '@/plugins/api';
import {
  BootstrapVue
} from 'bootstrap-vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSignInAlt, faSignOutAlt, faUserSlash, faExclamation, faArrowDown, faArrowUp, faTrashAlt, faSort, faSearch, faTimes, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faSignInAlt, faSignOutAlt, faUserSlash, faExclamation, faArrowDown, faArrowUp, faTrashAlt, faSort, faSearch, faTimes, faCog)
Vue.component('fa-icon', FontAwesomeIcon)

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)
Vue.use(Chartkick.use(Chart))

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2, {
  customClass: {
    confirmButton: 'btn btn-primary mx-1 mw-5',
    cancelButton: 'btn btn-outline-secondary mx-1 mw-5',
    popup: 'rounded shadow-lg',
  },
  buttonsStyling: false,
  cancelButtonText: "Avbryt"

});
Chartkick.options = {
  colors: ["#61599d"],
}
// Install BootstrapVue
Vue.use(BootstrapVue);
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
