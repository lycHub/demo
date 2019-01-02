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
<!--
    <Card :bordered="false" dis-hover class="f_card">
      <span slot="title">Collapse</span>
      <Collapse v-model="value1">
        <Panel :name="item.title" v-for="item in collapseData" :key="item.title">
          {{item.title}}
          <p slot="content">{{item.content}}</p>
        </Panel>
      </Collapse>
    </Card>-->
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "Other",
        data() {
            return {
                /*value1: '斯蒂夫·盖瑞·沃兹尼亚克',
                collapseData: [{
                   title: '史蒂夫·乔布斯',
                   content: '史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。'
                }, {
                    title: '斯蒂夫·盖瑞·沃兹尼亚克',
                    content: '斯蒂夫·盖瑞·沃兹尼亚克，1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。'
                }, {
                    title: '乔纳森·伊夫',
                    content: '乔纳森·伊夫，1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。'
                }],*/

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