<template>
  <div>
    <ul class="tabs">
      <li
        class="tabs-item"
        v-for="item in dataSource"
        :key="item.value"
        :class="{'selected':item.value===value,[classPrefix+'-tab-item']:classPrefix}"
        @click="selectedItem(item.value)"
      >{{item.text}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array })
  dataSource!: {
    value: string;
    text: string;
  }[];
  @Prop(String) value!: string;
  selectedItem(value: string) {
    this.$emit("update:value", value);
  }
  @Prop() classPrefix!: string;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tabs {
  display: flex;
  background: #c4c4c4;
  flex-direction: row;
  font-size: 24px;
  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 4px;
      background: #f08629;
      bottom: 0;
    }
    &.selected {
      background: #f08629;
      color: white;
    }
  }
}
</style>