<template>
  <nav class="nav">
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="labels" />
      <span>标签</span>
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money" />
      <span>记账</span>
    </router-link>
    <router-link to="/bill" class="item" active-class="selected">
      <Icon name="bill" />
      <span>账单</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default class Nav extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  > .item {
    width: 33.3333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > .icon {
      height: 32px;
      width: 32px;
    }
  }
  .selected {
    color: $high-light;
  }
}
</style>