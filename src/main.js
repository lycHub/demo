import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 全局组件
import './components/common'


// 全局样式
import 'iview/dist/styles/iview.css';
import './assets/styles/index.less';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
