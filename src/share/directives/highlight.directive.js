import Vue from 'vue';
Vue.directive('highlight', function (el, binding) {
  el.style.transition = 'color .2s';
  el.style.cursor = 'pointer';
  const color = binding.value || '#0099cc';
  el.addEventListener('mouseenter', function () {
    this.style.color = color;
  });
  el.addEventListener('mouseleave', function () {
    this.style.color = '';
  });
});
