<template>
  <div :class="[prefixCls + '-wrap']" ref="slider" @click.self="sliderClick">
    <!-- 色条 -->
    <div :class="[prefixCls + '-bar']" :style="barStyle" @click.self="sliderClick"></div>

    <!-- 断点 -->
    <template v-if="showDots">
      <div
        :class="[{active: item.active}, prefixCls + '-dot']"
        v-for="(item, index) in dots"
        :key="index"
        :style="{ 'left': item.left + '%' }"
        @click.self="sliderClick"
      ></div>
    </template>

    <!-- 刻度 -->
    <div :class="[prefixCls + '-scales']" v-show="showScales" :style="{top: scaleTop + 'px'}">
      <span
        v-for="(item, index) in scales"
        :key="index"
        :style="{width: item.scaleWidth + '%', marginLeft: item.marginLeft + '%', left: item.left + '%'}"
      >{{item.val}}</span>
    </div>

    <!-- 色块 -->
    <div
      :class="[prefixCls + '-button-wrap']"
      :style="{left: minPosition + '%'}"
      @touchstart="onHandStart($event, 'min')"
      @mousedown="onHandStart($event, 'min')">
      <VTooltip
        :controlled="pointerDown === 'min'"
        :content="formatTip(exportValue[0])"
        :disabled="tipDisabled"
        :always="showTip === 'always'"
        :placement="toolTipPoi"
        ref="minTooltip">
        <div :class="minButtonClasses"></div>
      </VTooltip>
    </div>

    <div
      :class="[prefixCls + '-button-wrap']"
      :style="{left: maxPosition + '%'}"
      v-show="range"
      @touchstart="onHandStart($event, 'max')"
      @mousedown="onHandStart($event, 'max')">
      <VTooltip
        :controlled="pointerDown === 'max'"
        :content="formatTip(exportValue[1])"
        :disabled="tipDisabled"
        :always="showTip === 'always'"
        :placement="toolTipPoi"
        ref="maxTooltip">
        <div :class="maxButtonClasses"></div>
      </VTooltip>
    </div>
  </div>
</template>

<script>
import { on, off } from "iview/src/utils/dom";
import { getStyle, oneOf } from "iview/src/utils/assist";
import VTooltip from "../v-tooltip";
export default {
  name: "VSlider",
  components: { VTooltip },
  props: {
    range: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showDots: {
      type: Boolean,
      default: false
    },

    showScales: {
      type: Boolean,
      default: false
    },

    // 格式化scale
    formatScales: {
      type: Function,
      default(val) {
        return val;
      }
    },


    // 自定义scale
    customScales: Object,

    // scale位置
    scalePoi: {
      type: String,
      default: "bottom",
      validator(value) {
        return oneOf(value, ["top", "bottom"]);
      }
    },


    showTip: {
      type: String,
      default: 'hover',
      validator (value) {
        return oneOf(value, ['hover', 'always', 'never']);
      }
    },

    // 格式化tip
    formatTip: {
      type: Function,
      default (val) {
        return val;
      }
    },

     // scale位置
    toolTipPoi: {
      type: String,
      default: "top",
      validator(value) {
        return oneOf(value, ["top", "bottom", "left", "right"]);
      }
    },

    value: {
      type: [Number, Array],
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    const val = this.checkLimits(
      Array.isArray(this.value) ? this.value : [this.value]
    );
    return {
      prefixCls: "v-slider",
      currentValue: val,
      oldValue: [...val],
      pointerDown: ""
    };
  },
  computed: {
    exportValue(values) {
      // step是小数就等于1，否则等于0
      const decimalCases = (String(this.step).split(".")[1] || "").length;
      return this.currentValue.map(nr => Number(nr.toFixed(decimalCases)));
    },
    // 左滑块位置
    minPosition() {
      const val = this.currentValue;
      // (当前数值 - 最小数值) / 数值范围 * 100 = 当前位置 <=> (当前位置 / 100) = (当前数值 - 最小数值) / 数值范围
      return ((val[0] - this.min) / this.valueRange) * 100;
    },

    // 右滑块位置
    maxPosition: function() {
      const val = this.currentValue;
      return ((val[1] - this.min) / this.valueRange) * 100;
    },
    barStyle() {
      const style = {
        width: ((this.currentValue[0] - this.min) / this.valueRange) * 100 + "%"
      };

      if (this.range) {
        style.left =
          ((this.currentValue[0] - this.min) / this.valueRange) * 100 + "%";
        style.width =
          ((this.currentValue[1] - this.currentValue[0]) / this.valueRange) *
            100 +
          "%";
      }

      return style;
    },
    minButtonClasses() {
      return [
        `${this.prefixCls}-button`,
        {
          [`${this.prefixCls}-button-active`]: this.pointerDown === "min"
        }
      ];
    },
    maxButtonClasses() {
      return [
        `${this.prefixCls}-button`,
        {
          [`${this.prefixCls}-button-active`]: this.pointerDown === "max"
        }
      ];
    },
    sliderWidth() {
      return parseInt(getStyle(this.$refs.slider, "width"), 10);
    },
    valueRange() {
      return this.max - this.min;
    },
    dots() {
      const dotCount = this.valueRange / this.step;
      const dots = [];

      // (刻度间隔 / 100) = (this.step / this.valueRange)
      const stepWidth = (100 * this.step) / this.valueRange;

      for (let i = 1; i < dotCount; i++) {
        const barStyle = {
          width:
            this.barStyle.width && Number(this.barStyle.width.slice(0, -1)),
          left:
            (this.barStyle.left && Number(this.barStyle.left.slice(0, -1))) || 0
        };
        const left = i * stepWidth;
        const active = this.range
          ? left > barStyle.left && left < barStyle.left + barStyle.width
          : left < barStyle.width;
        dots.push({ left, active });
      }

      // console.log('dots :', dots);
      return dots;
    },
    scales() {
      const scales = [];
      if (this.customScales) {
        const scaleCount = Object.keys(this.customScales).length;
        const scaleWidth = 100 / scaleCount;
        const marginLeft = -(scaleWidth / 2);

        for (const key in this.customScales) {
          const val =
            typeof key === "number"
              ? this.customScales[key]
              : parseFloat(this.customScales[key]);
          if (val >= this.min && val <= this.max) {
            scales.push({
              val,
              scaleWidth,
              marginLeft,
              left: ((key - this.min) / this.valueRange) * 100
            });
          }
        }
      } else {
        const scaleCount = this.valueRange / this.step;

        const scaleWidth = 100 / scaleCount;
        const marginLeft = -(scaleWidth / 2);

        for (let i = 0; i <= scaleCount; i++) {
          const left = i * ((100 * this.step) / this.valueRange);

          // (当前位置 / 100) = (当前数值 - 最小数值) / 数值范围
          // const val = (i === 0) ? this.min : Math.floor(((left / 100) * this.valueRange) + this.min);
          scales.push({
            val: this.formatScales(
              Math.floor((left / 100) * this.valueRange + this.min)
            ),
            scaleWidth,
            marginLeft,
            left
          });
        }
      }
      return scales;
    },

    scaleTop() {
      return this.scalePoi === "top" ? -22 : 14;
    },
    tipDisabled () {
      return this.formatTip(this.currentValue[0]) === null || this.showTip === 'never';
    },
  },
  watch: {
    showDots(n) {
      console.log("showDots :", n);
    },
    value(val) {
      val = this.checkLimits(Array.isArray(val) ? val : [val]);
      if (val[0] !== this.currentValue[0] || val[1] !== this.currentValue[1]) {
        this.currentValue = val;
      }
    },
    exportValue(values) {
      this.$nextTick(() => {
        this.$refs.minTooltip.updatePopper();
        if (this.range) {
            this.$refs.maxTooltip.updatePopper();
        }
      });
      const value = this.range ? values : values[0];
      this.$emit("input", value);
      this.$emit("on-input", value);
    }
  },
  methods: {
    onHandStart(event, target) {
      if (this.disabled) return;
      event.preventDefault();
      this.pointerDown = target; // 当前操作的滑块 min(左) max(右)

      this.onDragStart(event);
      on(window, "mousemove", this.onDragMove);
      on(window, "touchmove", this.onDragMove);
      on(window, "mouseup", this.onDragEnd);
      on(window, "touchend", this.onDragEnd);
    },

    onDragStart(event) {
      this.dragging = false;
      this.startX = this.getPointerX(event);
      this.startVal = this.currentValue[this.pointerDown === "min" ? 0 : 1];
      // console.log("startVal :", this.startVal);
    },

    onDragMove(event) {
      this.dragging = true;
      this.currentX = this.getPointerX(event);

      // (鼠标当前位置 - 鼠标起始位置) / 总长 * 数值范围 = 变化的值 <=> (变化的值 / 数值范围) = (鼠标当前位置 - 鼠标起始位置) / 总长
      const diff =
        ((this.currentX - this.startX) / this.sliderWidth) * this.valueRange;
      // console.log('diff :', diff);
      this.changeButtonPosition(this.startVal + diff);
    },

    onDragEnd() {
      if (this.dragging) {
        this.dragging = false;
        this.$refs[`${this.pointerDown}Tooltip`].visible = false;
        this.emitChange();
      }

      this.pointerDown = "";
      off(window, "mousemove", this.onDragMove);
      off(window, "touchmove", this.onDragMove);
      off(window, "mouseup", this.onDragEnd);
      off(window, "touchend", this.onDragEnd);
    },

    sliderClick(event) {
      if (this.disabled) return;
      const currentX = this.getPointerX(event);
      const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;

      // 新值
      let newVal =
        ((currentX - sliderOffsetLeft) / this.sliderWidth) * this.valueRange +
        this.min;
      // console.log('newPos :', newPos);
      if (!this.range || newVal <= this.minPosition) {
        this.changeButtonPosition(newVal, "min");
      } else if (newVal >= this.maxPosition) {
        this.changeButtonPosition(newVal, "max");
      } else {
        this.changeButtonPosition(
          newVal,
          newVal - this.currentValue[0] <= this.currentValue[1] - newVal
            ? "min"
            : "max"
        );
      }
    },

    changeButtonPosition(newVal, forceType) {
      const type = forceType || this.pointerDown;
      const index = type === "min" ? 0 : 1;
      if (type === "min") {
        newVal = this.checkLimits([newVal, this.max])[0];
      } else {
        newVal = this.checkLimits([this.min, newVal])[1];
      }
      // console.log('newVal :', newVal);

      const modulus = this.handleDecimal(newVal, this.step);
      // console.log('modulus :', modulus); newPos % this.step
      const value = this.currentValue;
      value[index] = newVal - modulus;
      // console.log('value :', value);
      this.currentValue = value.slice();

      if (!this.dragging) {
        if (this.currentValue[index] !== this.oldValue[index]) {
          this.emitChange();
          this.oldValue[index] = this.currentValue[index];
        }
      }
    },

    getPointerX(event) {
      return event.type.indexOf("touch") !== -1
        ? event.touches[0].clientX
        : event.clientX;
    },

    checkLimits([min, max]) {
      min = Math.max(this.min, min);
      min = Math.min(this.max, min);
      max = Math.max(this.min, min, max);
      max = Math.min(this.max, max);
      return [min, max];
    },

    handleDecimal(pos, step) {
      if (step < 1) {
        let sl = step.toString(),
          multiple = 1,
          m;
        try {
          m = sl.split(".")[1].length;
        } catch (e) {
          m = 0;
        }
        multiple = Math.pow(10, m);
        return ((pos * multiple) % (step * multiple)) / multiple;
      } else {
        return pos % step;
      }
    },
    emitChange() {
      const value = this.range ? this.exportValue : this.exportValue[0];

      // 松开时触发
      this.$emit("on-change", value);
    }
  },
  created() {
    this.dragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.startVal = 0;

    setTimeout(() => {
      // console.log('dots :', this.dots);
      console.log("scales :", this.scales);
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
.v-slider-wrap {
  width: 100%;
  height: 4px;
  margin: 16px 0;
  background-color: #e8eaec;
  border-radius: 3px;
  vertical-align: middle;
  position: relative;
  cursor: pointer;

  .v-slider-bar {
    height: 4px;
    background-color: #57a3f3;
    border-radius: 3px;
    position: absolute;
  }

  .v-slider-dot {
    position: absolute;
    top: -2px;
    width: 8px;
    height: 8px;
    margin-left: -4px;
    background-color: #fff;
    border: 2px solid #e8e8e8;
    border-radius: 50%;
    cursor: pointer;
    &.active {
      border-color: #57a3f3;
    }
  }

  .v-slider-scales {
    position: absolute;
    // top: 14px;
    left: 0;
    width: 100%;
    font-size: 14px;
    span {
      position: absolute;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      cursor: pointer;
    }
  }

  .v-slider-button-wrap {
    width: 18px;
    height: 18px;
    text-align: center;
    background-color: transparent;
    position: absolute;
    top: -5px;
    transform: translateX(-50%);

    .v-slider-button {
      width: 14px;
      height: 14px;
      border: 2px solid #57a3f3;
      border-radius: 50%;
      background-color: #fff;
      transition: transform 0.2s linear;
      &:hover {
        transform: scale(1.3);
      }
    }
    .v-slider-button-active {
      transform: scale(1.3);
    }
  }
}
</style>