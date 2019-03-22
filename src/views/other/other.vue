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
        <!-- <Slider v-model="value" :min="6" :max="60" range :step="2"></Slider> -->
        <!-- <VSlider v-model="value" :min="4" :max="16" :step="2" range showScales></VSlider> -->
        <VSlider v-model="value" :min="4" :max="10" showDots range></VSlider>
        <!-- 4 5 6 7 8 9 10 -->
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
      value: [4, 10]
    };
  },

  created() {
    
  },
  methods: {

  }
};
</script>