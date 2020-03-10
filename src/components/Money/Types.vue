<template>
  <ul class="types">
    <li :class="type==='-' &&'selected'" @click="selectType('-')">支出</li>
    <li :class="type==='+' && 'selected'" @click="selectType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  type = "-";
  @Prop(String) xxx: string | undefined;
  selectType(type: string) {
    if (type !== "-" && type !== "+") {
      throw new Error("type is unknown");
    } else {
      this.type = type;
    }
  }
  mounted() {
    console.log(this.xxx);
  }
}
</script>

<style lang="scss" scoped>
.types {
  display: flex;
  background: #c4c4c4;
  flex-direction: row;
  text-align: center;
  font-size: 24px;
  li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 4px;
      background: black;
      bottom: 0;
    }
  }
}
</style>