import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import './share/configs/axios'

// 全局组件
import './components/common'
import './components/business'


// 全局样式
import 'iview/dist/styles/iview.css'
import './assets/styles/index.less'


// editor
// import '../node_modules/quill/dist/quill.core.css'
import '../node_modules/quill/dist/quill.bubble.css'
import '../node_modules/quill/dist/quill.snow.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
