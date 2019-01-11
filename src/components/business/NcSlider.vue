<template>
    <div class="nc">

        <!--绿色覆盖物-->
        <div class="nc_bar" :style="{width: coverValue + 'px'}">
            <span v-show="isValid">验证成功</span>
        </div>

        <!--滑块-->
        <div class="nc_handle"
             ref="handle"
             @mousedown.prevent="onMouseDown"
             :style="{left: handleValue + 'px'}">
            <div class="icons">
                <Icon type="ios-checkmark-circle" v-if="isValid" />
                <span v-else>&#8250;&#8250;</span>
            </div>
        </div>
        <div class="nc_text"><span>请按住滑块，拖动到最右边</span></div>
    </div>
</template>

<script>
    import DomServe from 'share/utils/dom';

    export default {
        name: 'NcSlider',
        data() {
          return{
              allowDrag: false,
              handleValue: 0,
              coverValue: 0,

              // 验证成功？
              isValid: false
          }
        },

        methods: {
            onMouseDown(evt){
                if (this.$isServer || this.isValid) return;
                this.allowDrag = true;
                window.addEventListener('mousemove', this.onMouseMove);
                window.addEventListener('mouseup', this.onMouseUp);

                // 组件左侧left
                this.initX = Math.round(this.$el.getBoundingClientRect().left + DomServe.getWindowScroll().scrollLeft);

                // 滑块width
                this.handleWidth = this.$refs['handle'].offsetWidth

                // 滑块可滑动距离
                this.maxSlideDis = this.$el.offsetWidth - this.handleWidth;


                // 鼠标按下的位置
                this.starX = Number.parseInt(evt.clientX);
            },

            onMouseMove(evt){

                if (this.allowDrag) {

                    const halfWidth = this.handleWidth / 2;
                    this.handleValue = Math.max(0, Math.min(((evt.pageX - this.initX) - halfWidth), this.maxSlideDis));
                    if (this.handleValue >= this.maxSlideDis) {
                        this.coverValue = (this.handleValue + halfWidth);
                        this.isValid = true;
                        this.allowDrag = false;
                        window.removeEventListener('mousemove', this.onMouseMove);
                        // console.log('ok');
                    }else {
                        this.coverValue = this.handleValue;
                    }

                }

            },

            onMouseUp(){
                this.allowDrag = false;
                if (!this.isValid) {
                    this.handleValue = this.coverValue = 0;
                }else {
                    window.removeEventListener('mousemove', this.onMouseMove);
                    window.removeEventListener('mouseup', this.onMouseUp);
                    this.$emit('ncValid');
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .nc{
        position: relative;
        height: 40px;
        background-color: #dedbdb;
        border-radius: 5px;

        .nc_bar{
            position: absolute;
            height: 100%;
            left: 0;
            width: 0;
            background-color: #7ac23c;
            z-index: 2;
            overflow-x: hidden;

            span{
                display: block;
                height: 100%;
                line-height: 40px;
                color: #fff;
                text-align: center;
            }
        }

        .nc_handle{
            width: 45px;
            height: 100%;
            border: 1px solid #ddd;
            border-radius: 5px;
            position: absolute;
            left: 0;
            cursor: move;
            background: #fff;
            z-index: 2;
            color: #333;
            -webkit-font-smoothing: antialiased;

            .icons{
                height: 100%;
                line-height: 40px;
                text-align: center;
                font-size: 16px;
                color: #7ac23c;
            }
        }

        .nc_text{
            width: 100%;
            height: 100%;
            text-align: center;
            position: absolute;
            z-index: 1;
            background: transparent;
            color: #bbb;
            line-height: 40px;
            font-size: 12px;

            span{
                -webkit-text-fill-color: transparent;
                background-image: -webkit-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d));
                //background-image:  -webkit-linear-gradient(left,#129835,#ece648 25%,#129835 50%,#F9E92B 75%,rgb(40, 150, 38));
                background-size: 200%,100%;
                -webkit-background-clip: text;
                -webkit-animation: word 3s linear infinite ;
            }
        }
    }

    @keyframes word {
        from{background-position: 100% 0}
        to{background-position: -100% 0}
    }

</style>