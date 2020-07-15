<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="button">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove()">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear()">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok()">OK</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  @Prop(Boolean) success!: boolean;
  output = this.value.toString();
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const inputValue = button.textContent!;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0" && "1234567890".indexOf(inputValue) >= 0) {
      this.output = inputValue;
      return;
    }
    if (this.output.indexOf(".") >= 0 && inputValue === ".") {
      return;
    }
    this.output += inputValue;
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  clear() {
    this.output = "0";
  }
  ok() {
    if (this.output === "0") {
      return window.alert("金额不能为空");
    }
    if (this.output !== "0") {
      const number = parseFloat(this.output);
      this.$emit("update:value", number);
      this.$emit("saveRecord", number);
      this.$nextTick(() => {
        if (this.success === true) {
          return (this.output = "0");
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  > .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 32px;
    font-family: Consolas, monospace;
    padding: 6px 16px;
    text-align: right;
    background: white;
  }
  .button {
    @extend %clearFix;
    button {
      float: left;
      width: 25%;
      height: 55px;
      background: none;
      border: none;
      &.ok {
        height: 110px;
        float: right;
      }
      &.zero {
        width: 50%;
      }
      $bg: #e7e7e7;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 2 * 4%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10),
      &:nth-child(13) {
        background: darken($bg, 3 * 4%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 5 * 4%);
      }
      &:nth-child(12) {
        background: darken($bg, 6 * 4%);
      }
    }
  }
}
</style>