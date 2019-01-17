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
      <!--<ButtonGroup>
        <Button @click="getContent">getContent</Button>
        <Button @click="getText">getText</Button>
        <Button @click="insertEmbed">insertEmbed</Button>
        <Button @click="getHTml">getHTml</Button>
        <Button @click="setContents">setContents</Button>
        <Button @click="setHtml">setHtml</Button>
      </ButtonGroup>-->
      <tiny></tiny>
    </Card>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import tiny from './tiny.vue'
    export default {
        name: "Other",
        components: {
            tiny
        },
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

        mounted() {
            window.tinymce.init({
                selector: 'textarea',
                height: 550,
                theme: 'modern',
            })
        },


        methods: {
            getContent() {
                const content = this.quill.getContents();
                console.log(content);
            },

            getText() {
                const text = this.quill.getText();
                console.log(text);
            },

            insertEmbed() {
                this.quill.insertEmbed(10, 'image', 'http://p3.pstatp.com/large/pgc-image/RC6Uq0v4wFTXdQ');
            },

            getHTml() {
//                let [line, offset] = this.quill.getLines();
//                console.log(line.parent.domNode.innerHTML);
                console.log(this.quill.container.innerHTML);
            },

            setContents() {
                // <h2>dasdasdasdasdasd</h2><p><u>dadasdasd</u></p>
                this.quill.setContents([
                    { insert: `<h2>dasdasdasdasdasd</h2><p><u>dadasdasd</u></p>` },
                    { insert: '\n' }
                ]);
            },

            setHtml() {
                this.quill.clipboard.dangerouslyPasteHTML(0, `<div class="ql-editor" data-gramm="false" contenteditable="true" data-placeholder="Compose an epic..."><p class="ql-align-justify">2019年1月15日，中央纪委国家监委消息，陕西省委原书记赵正永涉嫌严重违纪违法，目前正接受中央纪委国家监委纪律审查和监察调查。</p><p><img src="http://p3.pstatp.com/large/pgc-image/eb6b7a161c764232a8c31f4eecff8f3d" alt="十八大后，这8位落马贪官都曾任省级党委书记"></p><p><br></p><p class="ql-align-justify">北京青年报记者注意到，随着赵正永的落马，十八大后至少8个在任或原任省级党委书记落马。</p><p class="ql-align-justify">除赵正永外，其他7人是：</p><p class="ql-align-justify">江西省委原书记苏荣（2014年6月落马）、云南省委原书记白恩培（2014年8月落马）、河北省委原书记周本顺（2015年7月落马）、辽宁省委原书记王珉（2016年3月落马）、天津市委原代理书记黄兴国（2016年9月落马）、甘肃省委原书记王三运（2017年7月落马）、重庆市委原书记孙政才（2017年7月落马）。</p><p class="ql-align-justify">不过，这些省级党委书记落马时的身份不同。</p><p><img src="http://p1.pstatp.com/large/pgc-image/0ebd150fabcb4545a5c0710305743c64" alt="十八大后，这8位落马贪官都曾任省级党委书记"></p><p><br></p><p class="ql-align-justify">苏荣落马时是“中国人民政治协商会议第十二届全国委员会副主席”，白恩培是“十二届全国人大环境与资源保护委员会副主任委员”，王珉是“十二届全国人大教育科学文化卫生委员会副主任委员”，王三运是“十二届全国人大教育科学文化卫生委员会副主任委员”。</p><p><img src="http://p1.pstatp.com/large/pgc-image/9edf143ff1b24503a33b8f85bf4e4abe" alt="十八大后，这8位落马贪官都曾任省级党委书记"></p><p><br></p><p class="ql-align-justify">周本顺是“河北省委书记、省人大常委会主任”，黄兴国是“天津市委代理书记、市长”。</p><p class="ql-align-justify">官方公布孙政才落马是在2017年7月24日。</p><p class="ql-align-justify">当时新华社报道，“鉴于孙政才同志涉嫌严重违纪，中共中央决定，由中共中央纪律检查委员会对其立案审查。”</p><p class="ql-align-justify">据中央纪委消息称，根据中央巡视组巡视和中央纪委、政法机关查办案件发现及群众举报反映的线索和证据，2017年7月14日，中央决定将孙政才调离重庆市委书记岗位，由中央纪委对其进行纪律审查、开展组织谈话。7月24日，中央政治局会议决定，由中央纪委对孙政才立案审查。</p><p class="ql-align-justify">赵正永担任陕西省委书记是在2012年12月至2016年3月，2016年4月至2018年3月任第十二届全国人民代表大会内务司法委员会副主任委员。</p><p><br></p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div><div class="ql-tooltip ql-hidden"><a class="ql-preview" target="_blank" href="about:blank"></a><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL"><a class="ql-action"></a><a class="ql-remove"></a></div>`);
            }
        },


        computed: mapGetters(['user'])  // 语法糖，相当于this.user = this.$store.state.user
    };
</script>