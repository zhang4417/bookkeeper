<template>
  <div>
    <Layout class="layout-wraper">
      <div class="tags">
        <router-link
          class="tag"
          v-for="tag in tags"
          :key="tag.value"
          :to="`/labels/edit/${tag.value}`"
        >
          <span>
            <Icon :name="tag.name" />
            {{tag.value}}
          </span>

          <Icon name="right" />
        </router-link>
      </div>
      <div class="newTags">
        <router-link to="/create">
          <Button @click="createTags()">新增标签</Button>
        </router-link>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "../components/Button.vue";

@Component({
  components: { Button },
  computed: {
    tags() {
      return this.$store.state.tags;
    }
  }
})
export default class Labels extends Vue {
  created() {
    this.$store.commit("fetchTags");
  }
  createTags() {
    this.$store.commit("createTags");
  }
}
</script>

<style lang="scss" scoped>
.layout-wraper {
  background: white;
}
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