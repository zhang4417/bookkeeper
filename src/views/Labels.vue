<template>
  <div>
    <Layout>
      <ul class="tags">
        <li>
          <span>日用</span>
          <Icon name="right" />
        </li>
        <li>
          <span>娱乐</span>
          <Icon name="right" />
        </li>
        <li>
          <span>交通</span>
          <Icon name="right" />
        </li>
        <li>
          <span>花呗</span>
          <Icon name="right" />
        </li>
      </ul>
      <div class="newTags">
        <button>新增标签</button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Labels"
});
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