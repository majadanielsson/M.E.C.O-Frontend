import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Report from '@/views/Report.vue'
import Csv from '@/views/Csv.vue'
import Portal from '@/views/Portal.vue'
import PortalIndex from '@/views/portal/Index.vue'
import PortalCourse from '@/views/portal/Course.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/portal',
    component: Portal,
    children: [{
        path: "",
        component: PortalIndex
      },
      {
        path: "courses/:id",
        component: PortalCourse
      }
    ]
  },
  {
    path: '/report',
    component: Report
  },
  {
    path: '/csv',
    component: Csv
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router