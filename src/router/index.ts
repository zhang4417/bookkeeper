import Vue from 'vue'
import VueRouter from 'vue-router'
import Labels from "@/views/Labels.vue"
import Money from "@/views/Money.vue"
import Bill from "@/views/Bill.vue"
import NotFound from "@/components/NotFound.vue"
import EditLabel from '@/views/EditLabel.vue';
import EChart from '@/views/EChart.vue';
import CreateTag from '@/views/CreateTag.vue'

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
    path: '/bill',
    component: Bill
  },
  {
    path: '/labels/edit/:id',
    component: EditLabel
  },
  {
    path: '/create',
    component: CreateTag
  },
  {
    path: '/chart',
    component: EChart
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
