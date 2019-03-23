<template>
  <div class="ed-select">
    <Dropdown @on-visible-change="onVisibleChange" trigger="custom" :visible="visible" :placement="placement" class="drop-down">
      <div class="trigger" @click="toggleMenu">
        <slot name="handle"></slot>
      </div>
      <DropdownMenu slot="list" @click.native="onMenuClick" class="dropdown-menu" :style="{width: panelWidth + 'px'}">
        <DropdownItem>
          <div class="ed-select-wrap">
            <div class="search" v-show="filterable">
              <i-Input placeholder="search folder" icon="ios-search" size="large" />
            </div>
            <div class="list-wrap">
              <Scroll v-if="count">
                <slot></slot>
              </Scroll>
              <template v-else>
                <slot name="no-result">
                  <!--如果外面不用这个slot, 就显示默认内容-->
                  <span class="no-result">未找到匹配项</span>
                </slot>
              </template>
            </div>
            <div class="new-item">
              <Button size="large" class="create-btn" :disabled="editing" @click="creating = true" v-show="!creating">{{createLabel}}</Button>
              <EdSelectCreate v-model="newItemName" v-show="creating" @on-ok="onCreated" @on-close="creating = false"></EdSelectCreate>
            </div>
          </div>
        </DropdownItem>
        <EdSpin v-if="false"></EdSpin>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
  import {findComponentsDownward} from "iview/src/utils/assist";

  export default {
    name: 'EdSelect',
    props: {
      editable: { // 是否可编辑
        type: Boolean,
        default: true
      },

      // 数据条数
      count: Number,

      panelWidth: {
        type: Number,
        default: 350
      },

      createLabel: {
        type: String,
        default: 'Create a new folder'
      },

       filterable: {
        type: Boolean,
         default: true
       },

      placement: {
          type: String,
          default: 'bottom-start'
      }
    },
    data() {
      return {
        visible: false,

        // 是否正在新建
        creating: false,

        // 是否正在编辑
        editing: false,
        newItemName: ''
      }
    },
    created() {
      // 是否点击了下拉面板
      this.selfClick = false;
    },
    mounted() {
      this.childrenItems =  findComponentsDownward(this, 'EdSelectItem');
    },
    watch: {
      editable: {
        handler(newVal) {
          this.$nextTick(() => {
            this.childrenItems.map(item => item.editable = newVal);
          });
        },
        immediate: true
      },
      creating(newVal) {
        this.childrenItems.map(item => item.creating = newVal);
      }
    },
    methods: {
      toggleMenu() {
        this.visible = !this.visible;
      },
      onVisibleChange(visib) {
        if (visib) {
          window.addEventListener('click', this._bindWinClick);
        }else {
          this._unBindWinClick();
          this.creating = false;
        }
        this.$emit('on-visible-change', visib);
      },
      onEditing(id) {
        this.childrenItems.map(item => {
           item.editing = item.id === id;
         });
        this.editing = true;
      },

      // 确认新建
      onCreated() {
        console.log(this.newItemName);
      },
      onClose(id) {
        this.childrenItems.find(item => item.id === id).editing = false;
        this.editing = false;
      },
      onMenuClick() {
        this.selfClick = true;
      },

      _bindWinClick() {
        if (!this.selfClick) {
          this.visible = false;
        }

        this.selfClick = false;
      },
      _unBindWinClick() {
        window.removeEventListener('click', this._bindWinClick);
      }
    },
    beforeDestory() {
        this._unBindWinClick();
    }
  }
</script>
<style scoped lang="less">
  @import "../../../assets/styles/variable";
  .ed-select {
    .drop-down{
      min-width: 100%;
      .dropdown-menu{
        position: relative;
        border: 1px solid @border-blue;
        .ed-select-wrap{
          .search{
            width: 90%;
            height:36px;
            margin: 0 auto;
          }
          .list-wrap{
            font-size: @font-size-normal;
            color: @font-color-normal;
            max-height: 300px;
            overflow: auto;
            .no-result{
              display: block;
              margin-top: 15px;
            }
          }
          .new-item{
            text-align: center;
            padding-top: 15px;
            .create-btn{
              background-color: @bg-btn-dull-prev;
              color: @color-white;
            }
          }
        }
      }
    }
  }
</style>
