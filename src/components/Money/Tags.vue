<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagContent"
        :key="tag"
        @click="toggle(tag)"
        :class="selectedTags.indexOf(tag)>=0 ? 'selected': ''"
      >{{tag}}</li>
    </ul>
    <div class="newAdd">
      <button @click="create()">新增</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop(Array) tagContent: string[] | undefined;
  selectedTags: string[] = [];
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      console.log(this.selectedTags);
    } else {
      this.selectedTags.push(tag);
      console.log(this.selectedTags);
    }
    this.$emit("update:value", this.selectedTags);
  }
  create() {
    const name = window.prompt("请输入标签名");
    if (name === "") {
      window.alert("标签名不能为空");
    } else {
      if (this.tagContent) {
        this.$emit("update:tagContent", [...this.tagContent, name]);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      margin-right: 8px;
      padding: 0 10px;
      $h: 24px;
      height: $h;
      border-radius: $h/2;
      line-height: $h;
      margin-top: 8px;
      &.selected {
        background: darken($bg, 50%);
      }
    }
  }
  > .newAdd {
    padding-top: 16px;
    > button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>