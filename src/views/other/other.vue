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
      <span slot="title" @click="changeList">Transfer</span>
      <!--:render-format="render1"-->
      <Transfer
              :data="data1"
              :target-keys="targetKeys1"
              @on-change="handleChange1">
      </Transfer>
    </Card>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    const sourceData1 = [{
        key: 'abc1',
        label: 'abc111'
    }, {
        key: 'abc2',
        label: 'abc222'
    }, {
        key: 'abc3',
        label: 'abc333'
    }, {
        key: 'abc4',
        label: 'abc444'
    }];

    const sourceData2 = [{
        key: 'def1',
        label: 'def111'
    }, {
        key: 'def2',
        label: 'def222'
    }, {
        key: 'def3',
        label: 'def333'
    }, {
        key: 'def4',
        label: 'def444'
    }];


    export default {
        name: "Other",
        data() {
            return {
                data1: sourceData1,
                targetKeys1: [],
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

        methods: {
            changeList() {
                this.data1 = sourceData2;
            },
           /* getMockData (key = 'abc') {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: key + i,
                        label: 'Content' + key + i
                    });
                }
                this.data1 = mockData;
                this.targetKeys1 = [...this.targetKeys1];
            },*/
          /*  getTargetKeys () {
                return this.getMockData()
                    .filter(() => Math.random() * 2 > 1)
                    .map(item => item.key);
            },*/
            /*render1 (item) {
                return item.label;
            },*/
            handleChange1 (newTargetKeys, direction, moveKeys) {
                console.log('newTargetKeys', newTargetKeys);
                console.log('direction', direction);
                console.log('moveKeys', moveKeys);
                this.targetKeys1 = newTargetKeys;
            }
        },

        watch: {
            targetKeys1(newVal) {
                console.log('newVal', newVal);
            }
        },

        created() {
//          console.log('user', this.$store.state.user);
            this.userInfo = this.user;

//            this.getMockData();
        },


        computed: mapGetters(['user'])  // 语法糖，相当于this.user = this.$store.state.user
    };
</script>