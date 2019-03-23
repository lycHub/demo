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
        <!--<VSlider v-model="value" :min="4" :max="60" showDots range></VSlider>-->
        <VSlider v-model="value" :step="4" :min="4" :max="60" showDots range></VSlider>
    </Card>


    <Card :bordered="false" dis-hover class="f_card">
      <span slot="title">垂直</span>
        <div style="width:10px;height:300px;margin:0 100px;">
            <VSlider v-model="value2" :min="0" :max="60" :step="10" showDots :vertical="true" range showScales :customScales="customScales"></VSlider>
        </div>
        <div style="width:10px;height:300px;margin:0 100px;">
            <VSlider toolTipPoi="left" scalePoi="left" :vertical="true" v-model="value4" :min="0" :max="1" :step="0.2" range showScales showDots></VSlider>
        </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: "Other",
  data() {
    return {
      value3: 0.4,
      value4: [0.2, 0.6],
      value: [10, 30],
      value2: [10, 20],
      customScales: {
        0: '0°C',
        10: '10°C',
        26: '26°C',
        37: '37°C',
        41: '41°C'
      }
    };
  },

  methods: {
    formatScales(val) {
      return '$' + val + '$';
    },
    formatTip(val) {
      return '$' + val + '$';
    }
  }
};
</script>
<style lang="less" scoped>

</style>
