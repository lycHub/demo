import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import './configs/axios'

// 全局组件
import './components/common'


// 全局样式
import 'iview/dist/styles/iview.css'
import './assets/styles/index.less'


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
