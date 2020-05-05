import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Admin from '@/views/Admin.vue'
import ReportIndex from '@/views/report/Index.vue'
import ReportReport from '@/views/report/Report.vue'
import Csv from '@/views/Csv.vue'
import Portal from '@/views/Portal.vue'
import PortalIndex from '@/views/portal/Index.vue'
import PortalCourse from '@/views/portal/Course.vue'
import VueChartJS from '@/views/VueChartJS'

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
    path: '/admin',
    component: Admin,
    children: [{
        path: "",
        component: ReportIndex
      },
      {
        path: "report/:courseId/:instanceId",
        component: ReportReport
      }
    ]
  },
  {
    path: '/csv',
    component: Csv
  },
  {
    path: '/chartjs',
    name: 'VueChartJS',
    component: VueChartJS
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router