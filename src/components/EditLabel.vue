<template>
  <Layout>
    <Icon name="left" />
    <span>编辑标签</span>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";

@Component
export default class EditLabel extends Vue {}
</script>

<style lang="scss" scoped>
</style>