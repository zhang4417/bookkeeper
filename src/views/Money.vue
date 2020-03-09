<template>
  <div>
    <Layout prefix="layout">
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
        </ul>
        <div class="newAdd">
          <button>新增</button>
        </div>
      </div>
      <label class="notes">
        <span>备注</span>
        <input type="text" placeholder="请在这里输入备注" />
      </label>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
      <div class="numberPad">
        <div class="output">100</div>
        <div class="button">
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
          <button class="ok">OK</button>
          <button class="zero">0</button>
          <button>.</button>
        </div>
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

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;

  > .current {
    border: 1px solid red;
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    > li {
      background: #d9d9d9;
      margin-right: 10px;
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
.notes {
  display: flex;
  background: #f5f5f5;
  padding-left: 16px;
  font-size: 14px;
  align-items: center;
  span {
    margin-right: 16px;
  }
  input {
    background: transparent;
    height: 64px;
    flex-grow: 1;
    border: none;
  }
}
.types {
  display: flex;
  background: #c4c4c4;
  flex-direction: row;
  text-align: center;
  font-size: 24px;
  li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 4px;
      background: black;
      bottom: 0;
    }
  }
}
.numberPad {
  > .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
  }
  .button {
    @extend %clearFix;
    button {
      float: left;
      width: 25%;
      height: 64px;
      background: none;
      border: none;
      &.ok {
        height: 128px;
        float: right;
      }
      &.zero {
        width: 50%;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 2 * 4%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10),
      &:nth-child(13) {
        background: darken($bg, 3 * 4%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 5 * 4%);
      }
      &:nth-child(12) {
        background: darken($bg, 6 * 4%);
      }
    }
  }
}
</style>