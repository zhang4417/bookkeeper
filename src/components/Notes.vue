<template>
  <label class="notes">
    <span>{{fileName}}</span>
    <input
      :type="inputType || 'text'"
      :value="inputValue"
      @input="onInuptValueChanged($event.target.value)"
      :placeholder="placeholder"
      :maxlength="maxlength"
    />
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  @Prop({ type: String, default: "" }) inputValue!: string;
  @Prop({ required: true }) fileName!: string;
  @Prop() placeholder?: string;
  @Prop() inputType?: string;
  @Prop() maxlength?: string;
  onInuptValueChanged(value: string) {
    this.$emit("update:inputValue", value);
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
    height: 58px;
    background: transparent;
    flex-grow: 1;
    border: none;
  }
}
</style>