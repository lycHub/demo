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
      <span slot="title">contenteditable</span>
      <div>
        <ButtonGroup>
          <Button @click="selectEmoji">表情</Button>
          <Button @click="gxh">个性化</Button>
        </ButtonGroup>
        <div contenteditable="true" @paste="onPaste" @mouseup="onMouseUp" style="border: 1px solid #d8d8d8;border-radius: 5px;padding: 10px;" ref="content">

        </div>
      </div>
    </Card>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import emoji from '../../assets/images/1f615.png'
    export default {
        name: "Other",
        data() {
            return {
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

        mounted() {

        },


        methods: {
            selectEmoji() {
                let html = this.$refs['content'].innerHTML;
                html += `<img src="${emoji}" style="width: 20px;">`;
                this.$refs['content'].innerHTML = html;
                console.log(html);
                console.log(emoji);
            },


            onPaste(e) {
                let text = '';
                if(window.clipboardData && clipboardData.setData) {
                    // IE
                    text = window.clipboardData.getData('text');
                } else {
                    text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('在这里输入文本');
                }
                console.log(text);
            },

            onMouseUp(evt) {
                const element = evt.target;
                var caretOffset = 0;
                var doc = element.ownerDocument || element.document;
                var win = doc.defaultView || doc.parentWindow;
                var sel;
                if (win.getSelection) {//谷歌、火狐
                    sel = win.getSelection();
//                    console.log(sel);
                    if (sel.rangeCount > 0) {//选中的区域
                        var range = win.getSelection().getRangeAt(0);
//                        console.log(range);
                        var preCaretRange = range.cloneRange();//克隆一个选中区域
                        console.log(preCaretRange);
                        preCaretRange.selectNodeContents(element);//设置选中区域的节点内容为当前节点
                        preCaretRange.setEnd(range.endContainer, range.endOffset);  //重置选中区域的结束位置
                        caretOffset = preCaretRange.toString().length;
                    }
                }
                this.poi = caretOffset;
                console.log(this.poi);
            },

            gxh() {
                let html = this.$refs['content'].innerHTML;
                const strStart = html.substr(0, this.poi);
                const strEnd = html.substr(this.poi);
                const result = strStart + '$[FNAME|Customer]$' + strEnd;
                this.$refs['content'].innerHTML = result;
                console.log(result);
            }
        },


        computed: mapGetters(['user'])  // 语法糖，相当于this.user = this.$store.state.user
    };
</script>