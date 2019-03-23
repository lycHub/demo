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
        <VSlider v-model="value" :min="0" :max="60" :step="10" range showScales showDots :formatTip="formatTip" :customScales="customScales"></VSlider>
        <!-- <VSlider v-model="value" :min="0" :max="60" :step="10" range showScales showDots :customScales="customScales"></VSlider> -->
        <!-- <VSlider v-model="value" :min="0" :max="60" :step="10" range showScales showDots :formatScales="formatScales"></VSlider> -->
        <!-- <VSlider v-model="value" :min="4" :max="10" showDots range></VSlider> -->
        <!-- <VSlider v-model="value" :min="0" :max="100" :step="10" range showScales></VSlider> -->
        {{value[0]}} -- {{value[1]}}
      </div>
    </Card>


    <Card :bordered="false" dis-hover class="f_card">
<<<<<<< HEAD
      <span slot="title">contenteditable</span>
      <div>
        <ButtonGroup>
          <Button @click="selectEmoji">表情</Button>
          <Button @click="gxh">个性化</Button>
        </ButtonGroup>
        <div contenteditable="true" @paste="onPaste" @mouseup="onMouseUp" style="border: 1px solid #d8d8d8;border-radius: 5px;padding: 10px;" ref="content">

        </div>
=======
      <span slot="title">垂直</span>
      <div style="width:10px;height:300px;margin:0 100px;">
        <VSlider v-model="value2" :min="0" :max="60" :step="10" showDots :vertical="true" range showScales :customScales="customScales"></VSlider>
>>>>>>> 657fe3c67610bf1b536e96ff2018ac26ee1f7d65
      </div>
    </Card>
  </div>
</template>

<script>
<<<<<<< HEAD
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
=======
import VSlider from './v-slider/v-slider'
import VTooltip from './v-tooltip'
export default {
  name: "Other",
  components: { VSlider, VTooltip },
  data() {
    return {
      value: [10, 20],
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
>>>>>>> 657fe3c67610bf1b536e96ff2018ac26ee1f7d65

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
