import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters'
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    getters,
    state,
    mutations,
    strict: debug,  // 严格模式https://vuex.vuejs.org/zh/guide/strict.html
    plugins: debug ? [createLogger()] : []
})
