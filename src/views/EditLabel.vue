<template>
  <Layout>
    <div class="navbar">
      <Icon class="leftContent" name="left" @click="goBack" />
      <span class="middleContent">编辑标签</span>
      <span class="rightContent"></span>
    </div>
    <Notes
      class="notes"
      :inputValue="tag"
      @update:value="update"
      fileName="标签"
      placeholder="请输入标签名"
    />
    <div class="button-wraper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Notes from "@/components/Notes.vue";
import Button from "@/components/Button.vue";
import store2 from "@/store/index2.ts";

@Component({
  components: { Notes, Button }
})
export default class EditLabel extends Vue {
  tag!: string;
  tags = store2.fetchTags();

  created() {
    const id = this.$route.params.id;
    if (this.tags.indexOf(id) >= 0) {
      this.tag = id;
    } else {
      this.$router.replace("/404");
    }
  }
  goBack() {
    const id = this.$route.params.id;
    const index = this.tags.indexOf(id);
    if (this.tag !== "") {
      this.tags.splice(index, 1, this.tag);
      console.log(this.tags);
      store2.saveTags();
    }
    this.$router.back();
  }
  update(value: string) {
    this.tag = value;
  }
  remove() {
    const id = this.$route.params.id;
    const index = this.tags.indexOf(id);
    this.tags.splice(index, 1);
    console.log(this.tags);
    store2.saveTags();
    this.$router.back();
  }
}
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