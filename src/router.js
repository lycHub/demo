import Vue from 'vue'
import Router from 'vue-router'
import Refund from './views/finance/refund/refund.route'
import RefundDetail from './views/finance/refund/refundDetail/refundDetail.route'
import phoneMap from './views/phone/phone-map/phoneMap.route'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      { path: '/', redirect: { name: 'refund' }},
      Refund, RefundDetail, phoneMap
     /* {
          path: '*',
          name: '404',
          component: NotFound,
      }*/
  ]
})
