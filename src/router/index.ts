import Vue from 'vue'
import VueRouter from 'vue-router'
import Labels from "@/views/Labels.vue"
import Money from "@/views/Money.vue"
import Statistics from "@/views/Statistics.vue"
import NotFound from "@/components/NotFound.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/money'
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
