<template>
  <div>
    <Layout>
      <div class="tags">
        <ul class="current">
          <li>娱乐</li>
          <li>日用</li>
          <li>交通</li>
          <li>房贷</li>
        </ul>
        <div class="newAdd">
          <button>新增</button>
        </div>
      </div>
      <label class="notes">
        <span>备注</span>
        <input type="text" />
      </label>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
      <div class="nodePade">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>OK</button>
        <button>0</button>
        <button>.</button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/components/Layout.vue";

export default Vue.extend({
  name: "Money"
});
</script>

<style lang="scss" scoped>
</style>