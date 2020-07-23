<template>
  <Layout class="layout-wraper">
    <div class="top-border"></div>
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
        <Button @click="createTags()" class="newButton">新增标签</Button>
      </router-link>
    </div>
  </Layout>
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
.top-border {
  height: 1px;
  background: #f08629;
}
.layout-wraper {
  background: #f5f5f5;
}
.tags {
  background: white;
  padding-left: 16px;
  .tag {
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 44px;
    color: #f08629;
    svg {
      width: 18px;
      height: 18px;
      margin-right: 16px;
      color: #f08629;
    }
  }
}
.newTags {
  text-align: center;
  padding-bottom: 36px;
  padding-top: 36px;
  margin: 16px auto;
}
</style>