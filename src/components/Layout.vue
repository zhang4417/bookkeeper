<template>
  <div class="page">
    <div class="content" :class=" prefix && `${prefix}-content`">
      <slot></slot>
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Layout",
  props: ["prefix"]
});
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex-grow: 1;
  overflow: auto;
}
</style>