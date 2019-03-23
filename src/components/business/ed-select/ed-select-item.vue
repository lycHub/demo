<template>
  <div class="list-item">
    <div class="item-wrap" v-if="!editing" :style="{'color': active ? '#0099cc' : ''}">
      <div class="info">
        <slot></slot>
      </div>
      <div class="operators" v-show="editable && !disabled">
        <Icon custom="i-icon icon-bianji" size="25" :class="editClass" @click="onEditing()" />
        <Icon type="ios-trash" size="25" />
      </div>
    </div>

    <div class="item-wrap" v-else>
      <EdSelectCreate v-model="newItemName" @on-ok="onEdited" @on-close="onClose()"></EdSelectCreate>
    </div>
  </div>
</template>
<script>
  import {findComponentUpward} from "iview/src/utils/assist";

  export default {
    name: 'EdSelectItem',
    props: {
      id: {
        type: [Number, String],
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },

      label: [Number, String],

      // 是否被选中
      active: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        editing: false,
        newItemName: this.label,
        creating: false,
        editable: true
      }
    },
    computed: {
      editClass() {
          return this.creating ? 'edit disabled' : 'edit'
      }
    },
    mounted() {
      this.parent = findComponentUpward(this, 'EdSelect');
    },
    methods: {
      onEditing() {
        if (this.creating) return;
//        this.$emit('on-editing', id);
        this.parent.onEditing(this.id);
      },
      onClose() {
//        this.$emit('on-close', id);
        this.parent.onClose(this.id);
      },
      onEdited() {
        console.log(this.newItemName);
      }
    }
  }
</script>
<style scoped lang="less">
  .list-item{
    padding: 10px 0;
    .item-wrap{
      display: flex;
      /*justify-content: space-between;*/
      align-items: center;

      &:hover{
        .operators{
          visibility: visible;
        }
      }

      .operators{
        margin-left: 28px;
        visibility: hidden;
        .edit{
          margin-right: 10px;
          &.disabled{
            cursor: not-allowed;
          }
        }
      }
    }
  }
</style>
