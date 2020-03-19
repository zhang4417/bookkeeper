<template>
  <button @click="$emit('click',$event)">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
button {
  border-radius: 4px;
  background: #726f6f;
  border: none;
  color: white;
  padding: 0 16px;
  height: 40px;
}
</style>