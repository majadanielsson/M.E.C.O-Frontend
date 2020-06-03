import Vue from 'vue'
import VueRouter from 'vue-router'
import Dev from '@/views/Dev.vue'
import Login from '@/views/Login.vue'
import ReportIndex from '@/views/report/Index.vue'
import ReportReport from '@/views/report/Report.vue'
import Csv from '@/views/Csv.vue'
import PortalIndex from '@/views/portal/IndexBeta.vue'
import PortalCourse from '@/views/portal/Course.vue'
import NotFound from '@/views/404.vue'
import Unauthorized from '@/views/401.vue'
import Moderator from '@/views/Moderator.vue'
import Evaluation from '@/views/Evaluation.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/portal'
},
{
  // TEMPORARY
  path: '/dev',
  component: Dev
},
{
  path: '/moderator',
  component: Moderator,
  name: "Moderator"
},
{
  path: '/evaluation',
  component: Evaluation,
  name: "Evaluation"
},
{
  path: '/login',
  component: Login
},
{
  path: "/portal",
  component: PortalIndex,
  name: "PortalIndex"
},
{
  path: "/portal/courses/:id",
  component: PortalCourse,
  name: "PortalCourse"
},
{
  path: "/admin",
  component: ReportIndex,
  name: "ReportIndex"
},
{
  path: "/admin/report/:courseId/:instanceId",
  component: ReportReport
},
{
  path: '/csv',
  component: Csv,
  name: "CSV"
},
{
  path: "/401",
  component: Unauthorized
},
{
  path: "*",
  component: NotFound
}
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router