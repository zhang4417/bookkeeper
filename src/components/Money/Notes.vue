<template>
  <label class="notes">
    <span>备注</span>
    <input type="text" v-model="inputValue" placeholder="请在这里输入备注" />
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  inputValue = "";
  @Watch("inputValue")
  onInuptValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  display: flex;
  background: #f5f5f5;
  padding-left: 16px;
  font-size: 14px;
  align-items: center;
  span {
    margin-right: 16px;
  }
  input {
    background: transparent;
    height: 64px;
    flex-grow: 1;
    border: none;
  }
}
</style>