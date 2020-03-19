<template>
  <div class="name-wraper">
    <div class="tagNav">
      <Icon name="left" @click="back" />
      <span>新增标签页</span>
      <Icon name="add" @click="commit" />
    </div>
    <Notes
      class="tagInput"
      :fileName="'标签'"
      :placeholder="'请输入新增标签名'"
      :inputValue.sync="nameRecord.value"
    />
    {{nameRecord}}
    <div class="iconList">
      <Icon
        v-for="name in income"
        :key="name"
        @click="toggle(name)"
        :class="{'selected':nameRecord.name===name}"
        class="item"
        :name="name"
      />
      {{nameRecord.name}}
    </div>
    <div class="iconList down-icon">
      <Icon
        v-for="name in outlay"
        :key="name"
        @click="toggle(name)"
        :class="{'selected':nameRecord.name===name}"
        class="item"
        :name="name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Notes from "@/components/Notes.vue";
import Icon from "@/components/Icon.vue";
import { Component } from "vue-property-decorator";
import Nav from "@/components/Nav.vue";

@Component({ components: { Notes, Icon } })
export default class CreateTag extends Vue {
  get createTagsError() {
    return this.$store.state.createTagsError;
  }
  income: string[] = [
    "yuLe",
    "youXi",
    "yinEr",
    "yiLiao",
    "maiCai",
    "lvXing",
    "liPin",
    "juHui",
    "jiaoTong",
    "jianSheng",
    "gouWu",
    "fangDai",
    "cheDai",
    "huaZhuang"
  ];
  outlay: string[] = ["jiangJin", "gongZi", "caiPiao", "others"];
  nameRecord: { [key: string]: string } = { value: "", name: "" };
  //{value:xx,name:xx}
  toggle(name: string) {
    this.nameRecord.name = name;
  }
  commit() {
    if (this.nameRecord.name === "") {
      return window.alert("你还没有选择logo");
    }
    this.$store.commit("createTags", this.nameRecord);
  }
  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.name-wraper {
  border: 1px solid red;
  height: 100vh;
  background: white;
}
.tagNav {
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: red;
}
.tagInput {
  margin-top: 24px;
  margin-bottom: 24px;
}
.iconList {
  display: flex;
  flex-wrap: wrap;
  > .item {
    margin-right: 16px;
    margin-left: 16px;
    margin-top: 32px;
  }
  > ::v-deep svg {
    width: 36px;
    height: 36px;
  }
}
.down-icon {
  margin-top: 32px;
  box-shadow: 0 -4px 5px -5px rgba(0, 0, 0, 0.2);
}
::v-deep .selected {
  color: red;
}
</style>