import VSlider from './views/other/v-slider/v-slider.vue'
const plugin = {};
plugin.install = function (Vue, options) {
  console.log('options', options);
  Vue.component(VSlider.name, VSlider)
};

if (window.Vue) Vue.use(Plugin);
export default plugin;