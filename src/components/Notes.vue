<template>
  <label class="notes">
    <span>{{fileName}}</span>
    <input type="text" v-model="inputValue" :placeholder="placeholder" />
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  @Prop({required:true}) fileName!: string;
  @Prop() placeholder?: string;
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