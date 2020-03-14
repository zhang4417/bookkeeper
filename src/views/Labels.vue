<template>
  <div>
    <Layout>
      <div class="tags">
        <router-link class="tag" v-for="tag in data" :key="tag" :to="`/labels/edit/${tag}`">
          <span>{{tag}}</span>
          <Icon name="right" />
        </router-link>
      </div>
      <div class="newTags">
        <Button @click="createTags()">新增标签</Button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagsListModel from "@/model/tagsListModel";
import Button from "../components/Button.vue";

tagsListModel.fetch();
@Component({
  components: { Button }
})
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
  .tag {
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
}
</style>