<template>
  <div :class="[prefixCls]" @mouseenter="handleShowPopper" @mouseleave="handleClosePopper">
    <div :class="[prefixCls + '-rel']" ref="reference">
      <slot></slot>
    </div>
    <transition name="fade">
      <div
        :class="[prefixCls + '-popper', prefixCls + '-' + theme]"
        ref="popper"
        v-show="!disabled && (visible || always)"
        @mouseenter="handleShowPopper"
        @mouseleave="handleClosePopper"
      >
        <div :class="[prefixCls + '-content']">
          <div :class="[prefixCls + '-arrow']"></div>
          <div :class="innerClasses" :style="innerStyles">
            <slot name="content">{{ content }}</slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Vue from "vue";
const isServer = Vue.prototype.$isServer;
const Popper = isServer
  ? function() {}
  : require("popper.js/dist/umd/popper.js"); // eslint-disable-line
import { oneOf } from "iview/src/utils/assist";

const prefixCls = "v-tooltip";

export default {
  name: "VTooltip",
  props: {
    placement: {
      validator(value) {
        return oneOf(value, [
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "left",
          "left-start",
          "left-end",
          "right",
          "right-start",
          "right-end"
        ]);
      },
      default: "top"
    },
    boundariesPadding: {
      type: Number,
      default: 5
    },
    reference: Object,
    popper: Object,
    content: {
      type: [String, Number],
      default: ""
    },
    delay: {
      type: Number,
      default: 100
    },
    disabled: {
      type: Boolean,
      default: false
    },
    controlled: {
      // under this prop,Tooltip will not close when mouseleave
      type: Boolean,
      default: false
    },
    always: {
      type: Boolean,
      default: false
    },
    theme: {
      validator(value) {
        return oneOf(value, ["dark", "light"]);
      },
      default: "dark"
    },
    maxWidth: {
      type: [String, Number]
    },
    offset: {
      default: 0
    },
    value: {
      type: Boolean,
      default: false
    },
    transition: String,
    options: {
      type: Object,
      default() {
        return {
          modifiers: {
            computeStyle: {
              gpuAcceleration: false
            },
            preventOverflow: {
              boundariesElement: "window"
            }
          }
        };
      }
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      visible: this.value
    };
  },
  computed: {
    innerStyles() {
      const styles = {};
      if (this.maxWidth) styles["max-width"] = `${this.maxWidth}px`;
      return styles;
    },
    innerClasses() {
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-inner-with-width`]: !!this.maxWidth
        }
      ];
    }
  },
  watch: {
    content() {
      this.updatePopper();
    },
    value: {
      immediate: true,
      handler(val) {
        this.visible = val;
        this.$emit("input", val);
      }
    },
    visible(val) {
      if (val) {
        if (this.handleIndexIncrease) this.handleIndexIncrease(); // just use for Poptip
        this.updatePopper();
        this.$emit("on-popper-show");
      } else {
        this.$emit("on-popper-hide");
      }
      this.$emit("input", val);
    }
  },
  methods: {
    handleShowPopper() {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.visible = true;
      }, this.delay);
    },
    handleClosePopper() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        if (!this.controlled) {
          this.timeout = setTimeout(() => {
            this.visible = false;
          }, 100);
        }
      }
    },
    createPopper() {
      if (isServer) return;
      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.placement)) {
        return;
      }

      const options = this.options;
      const popper = this.popper || this.$refs.popper;
      const reference = this.reference || this.$refs.reference;

      if (!popper || !reference) return;

      if (this.popperJS && this.popperJS.hasOwnProperty("destroy")) {
        this.popperJS.destroy();
      }

      options.placement = this.placement;

      if (!options.modifiers.offset) {
        options.modifiers.offset = {};
      }
      options.modifiers.offset.offset = this.offset;
      options.onCreate = () => {
        this.$nextTick(this.updatePopper);
        this.$emit("created", this);
      };

      this.popperJS = new Popper(reference, popper, options);
    },
    updatePopper() {
      if (isServer) return;
      this.popperJS ? this.popperJS.update() : this.createPopper();
    },
    doDestroy() {
      if (isServer) return;
      if (this.visible) return;
      this.popperJS.destroy();
      this.popperJS = null;
    }
  },
  mounted() {
    if (this.always) {
      this.updatePopper();
    }
  },
  updated() {
    this.$nextTick(() => this.updatePopper());
  },
  beforeDestroy() {
    if (isServer) return;
    if (this.popperJS) {
      this.popperJS.destroy();
    }
  }
};
</script>