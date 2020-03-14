<template>
  <Layout>
    <div class="navbar">
      <Icon class="leftContent" name="left" />
      <span class="middleContent">编辑标签</span>
      <span class="rightContent"></span>
    </div>
    <Notes class="notes" fileName="标签" placeholder="请输入标签名" />
    <div class="button-wraper">
      <Button>删除标签</Button>
    </div>
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
.navbar {
  background: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .leftContent {
    height: 18px;
    width: 18px;
  }
  > .rightContent {
    height: 18px;
    width: 18px;
  }
}
.notes {
  background: white;
  margin-top: 16px;
  height: 40px;
}
.button-wraper {
  text-align: center;
  padding: 16px;
  margin-top: 44px;
}
</style>