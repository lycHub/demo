import VSlider from './views/other/v-slider/v-slider.vue'
const plugin = {};
plugin.install = function (Vue, options) {
  console.log('options', options);
  Vue.component(VSlider.name, VSlider)
};
export default plugin;