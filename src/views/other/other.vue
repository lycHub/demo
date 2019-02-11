<style lang="less" scoped>
  .other{
    .f_card{
      margin: 20px 0;
    }
  }
</style>

<template>
  <div class="other">
    <Card :bordered="false" dis-hover class="f_card">
      <span slot="title">个人信息</span>
      <CellGroup class="info">
        <Cell title="姓名" :extra="userInfo.name" />
        <Cell title="年龄" :extra="userInfo.age" />
        <Cell title="电话" :extra="userInfo.tel" />
        <Cell title="email" :extra="userInfo.email" />
      </CellGroup>
    </Card>
    <Card :bordered="false" dis-hover class="f_card">
      <span slot="title">eidtor</span>
    </Card>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "Other",
        data() {
            return {
                content: '',
                userInfo: {
                 /*   name: '李四',
                    age: '33',
                    tel: '电话',
                    email: '1120805364@qq.com'*/
                }
            }
        },

        created() {
//          console.log('user', this.$store.state.user);
            this.userInfo = this.user;
        },

        computed: mapGetters(['user'])  // 语法糖，相当于this.user = this.$store.state.user
    };
</script>