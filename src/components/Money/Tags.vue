<template>
  <div class="tags">
    <ul class="current">
      <li>娱乐</li>
      <li>日用</li>
      <li>交通</li>
      <li>花呗</li>
      <li>娱乐</li>
      <li>日用</li>
      <li>交通</li>
      <li>花呗</li>
      <li>娱乐</li>
      <li>日用</li>
      <li>交通</li>
      <li>花呗</li>
      <li>娱乐</li>
      <li>日用</li>
      <li>交通</li>
      <li>花呗</li>
      <li>娱乐</li>
      <li>日用</li>
      <li>交通</li>
      <li>花呗</li>
    </ul>
    <div class="newAdd">
      <button>新增</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Tags"
});
</script>

<style lang="scss" scoped>
.tags {
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
      background: #d9d9d9;
      margin-right: 8px;
      padding: 0 10px;
      $h: 24px;
      height: $h;
      border-radius: $h/2;
      line-height: $h;
      margin-top: 8px;
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