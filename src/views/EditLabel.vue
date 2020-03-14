<template>
  <Layout>
    <Icon name="left" />
    <span>编辑标签</span>
    <Notes fileName="标签" placeholder="请输入标签名" />
    <Button>删除标签</Button>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
import Notes from "@/components/Notes.vue";
import Button from "@/components/Button.vue";

@Component({
  components: { Notes, Button }
})
export default class EditLabel extends Vue {}
</script>

<style lang="scss" scoped>
</style>