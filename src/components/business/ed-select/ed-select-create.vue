<template>
  <div class="create">
    <i-Input :value="value" class="input" @on-change="$emit('input', $event.target.value)" />
    <div class="operators">
      <Icon type="md-checkmark" size="25" class="ok" @click="$emit('on-ok')" />
      <Icon type="md-close" size="25" @click="$emit('on-close')" />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'EdSelectCreate',
    props: {
      value: String
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../assets/styles/variable";
  .create{
    display: flex;
    align-items: center;
    width: 90%;
    .operators{
      margin-left: 28px;
      .ok{
        margin-right: 10px;
        color: @color-primary;
      }
    }
  }
</style>
