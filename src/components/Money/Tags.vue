<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.value"
        @click="toggle(tag)"
        :class="selectedTags.indexOf(tag)>=0 ? 'selected': ''"
      >
        {{tag.value}}
        <Icon :name="tag.name" />
      </li>
    </ul>
    <div class="newAdd">
      <!-- <button class="add" @click="createTags()">新增</button> -->
      <router-link class="add" to="/create">新增</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class Tags extends Vue {
  get tagList() {
    return this.$store.state.tags as Tag[];
  }
  selectedTags = [] as Tag[];
  created() {
    this.$store.commit("fetchTags");
  }
  toggle(tag: Tag) {
    const index = this.selectedTags.indexOf(tag);
    if (this.selectedTags.length === 0) {
      this.selectedTags.push(tag);
    }
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.splice(0, 1, tag);
    }
    this.$emit("update:value", this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: #f08629;
  font-size: 14px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    > li {
      display: inline-block;
      $bg: white;
      background: $bg;
      margin-right: 8px;
      padding: 0 10px;
      $h: 24px;
      height: $h;
      border-radius: $h/2;
      line-height: $h;
      margin-top: 8px;
      &.selected {
        background: #ffaf38;
        color: white;
      }
    }
  }
  > .newAdd {
    padding-top: 16px;
    padding-bottom: 16px;
    > .add {
      background: transparent;
      border: none;
      color: white;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>