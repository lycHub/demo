import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 全局配置
import './share/configs/axios'

// 全局指令
import './share/directives/index'

// 全局组件
import './components/common'
import './components/business'


// 全局样式
import 'iview/dist/styles/iview.css'
import './assets/styles/index.less'

import VSlider from './v-slider'
Vue.use(VSlider);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
