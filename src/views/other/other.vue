<style lang="less" scoped>
.other {
  .f_card {
    margin: 20px 0;
  }
}
</style>

<template>
  <div class="other">
    <Card :bordered="false" dis-hover class="f_card">
      <span slot="title">slider</span>
      <div style="width:500px; margin:20px auto;">
        <!-- <Slider v-model="value" :min="6" :max="60" range></Slider> -->
        <!-- <VSlider v-model="value" :min="0" :max="60" :step="10" range showScales showDots></VSlider> -->
        <!-- <VSlider v-model="value" scalePoi="top" :min="0" :max="60" :step="10" range showScales showDots :customScales="customScales"></VSlider> -->
        <VSlider v-model="value" :min="0" :max="60" :step="10" range showScales showDots :customScales="customScales"></VSlider>
        <!-- <VSlider v-model="value" :min="0" :max="60" :step="10" range showScales showDots :formatScales="formatScales"></VSlider> -->
        <!-- <VSlider v-model="value" :min="4" :max="10" showDots range></VSlider> -->
        <!-- <VSlider v-model="value" :min="0" :max="100" :step="10" range showScales></VSlider> -->
        {{value[0]}} -- {{value[1]}}
      </div>
    </Card>
  </div>
</template>

<script>
import VSlider from './v-slider'
export default {
  name: "Other",
  components: { VSlider },
  data() {
    return {
      value: [10, 20],
      customScales: {
        0: '0°C',
        10: '10°C',
        26: '26°C',
        37: '37°C'
      }
    };
  },

  created() {
    
  },
  methods: {
    formatScales(val) {
      return '$' + val + '$';
    }
  }
};
</script>