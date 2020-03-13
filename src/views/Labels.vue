<template>
  <div>
    <Layout>
      <ul class="tags">
        <li v-for="tag in data" :key="tag">
          <span>{{tag}}</span>
          <Icon name="right" />
        </li>
      </ul>
      <div class="newTags">
        <button @click="createTags()">新增标签</button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagsListModel from "@/model/tagsListModel";

tagsListModel.fetch();
@Component
export default class Labels extends Vue {
  data = tagsListModel.data;
  createTags() {
    tagsListModel.create();
  }
}
</script>

<style lang="scss" scoped>
.tags {
  padding-left: 16px;
  li {
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 44px;
    svg {
      width: 18px;
      height: 18px;
      margin-right: 16px;
      color: #666;
    }
  }
}
.newTags {
  text-align: center;
  margin-top: 44px;
  button {
    border-radius: 4px;
    background: #767676;
    border: none;
    color: white;
    padding: 0 16px;
    height: 40px;
  }
}
</style>