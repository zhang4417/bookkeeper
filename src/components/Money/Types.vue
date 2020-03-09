<template>
  <ul class="types">
    <li class="selected">支出</li>
    <li>收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Types"
});
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