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
      <span slot="title">组件</span>
      <div class="select-wrap" style="display:inline-block; width: 200px;">
        <EdSelect :count="classifies.length" @on-visible-change="visible = $event">
          <Button slot="handle" icon="ios-folder-outline" size="large" :class="classifyBtnClass">
            Uncategorized(111)
            <!--<Icon :type="classifyIconType" size="18" />-->
            <Icon type="ios-arrow-down" size="18" />
          </Button>
          <EdSelectItem v-for="item in classifies" :key="item.id" :disabled="item.disabled" :id="item.id" :label="item.name">
            <span v-highlight>{{item.name}}({{item.count}})</span>
          </EdSelectItem>
        </EdSelect>
      </div>

      <div class="select-wrap" style="display:inline-block; width: 200px;margin-left: 100px;">
        <EdSelect placement="bottom-end" :count="emails.length" :editable="false" :createLabel="'add a new address'" @on-visible-change="visible = $event">
          <i-Input icon="ios-arrow-down" slot="handle" />
          <EdSelectItem v-for="(item, index) in emails" :key="index" :id="index">
            <span v-highlight>{{item}}</span>
          </EdSelectItem>
        </EdSelect>
      </div>
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
                },
                // 下拉是否显示
                visible: false,
                emails: [
                    '1120805364@qq.com',
                    '1120805362@qq.com',
                    '1120805363@qq.com',
                    '1120805365@qq.com',
                    '1120805366@qq.com',
                    '1120805374@qq.com',
                    '1120805384@qq.com'
                ],
                classifies: [{
                    id: 'all',
                    name: '全部',
                    count: 1111,
                    disabled: true
                }, {
                    id: 'c0',
                    name: '未分类',
                    count: 111,
                    disabled: true
                }, {
                    id: 'c1',
                    name: '客户推广营销分组1',
                    count: 111
                }, {
                    id: 'c2',
                    name: '客户推广营销分组2',
                    count: 222
                },{
                    id: 'c3',
                    name: '客户推广营销分组3',
                    count: 333
                },{
                    id: 'c4',
                    name: '客户推广营销分组4',
                    count: 444
                },{
                    id: 'c5',
                    name: '客户推广营销分组5',
                    count: 555
                },{
                    id: 'c6',
                    name: '客户推广营销分组6',
                    count: 666
                },{
                    id: 'c7',
                    name: '客户推广营销分组7',
                    count: 777
                }]
            }
        },

        created() {
//          console.log('user', this.$store.state.user);
            this.userInfo = this.user;
        },

        computed: {
            classifyBtnClass() {
                return this.visible ? 'btn-ed-select active' : 'btn-ed-select';
            },
            classifyIconType() {
                return this.visible ? 'ios-arrow-up' : 'ios-arrow-down';
            },
            ...mapGetters(['user'])  // 语法糖，相当于this.user = this.$store.state.user
        }
    };
</script>