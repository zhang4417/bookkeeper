<template>
  <div class="name-wraper">
    <div class="navbar">
      <Icon name="left" class="leftContent" @click="back" />
      <span class="middleContent">新增标签页</span>
      <Icon name="add" class="rightContent" @click="commit" />
    </div>
    <Notes
      class="tagInput"
      :fileName="'标签'"
      :placeholder="'请输入新增标签名'"
      :inputValue.sync="nameRecord.value"
    />
    <div class="iconList">
      <Icon
        v-for="name in layout"
        :key="name"
        @click="toggle(name)"
        :class="{'selected':nameRecord.name===name}"
        class="item"
        :name="name"
      />
    </div>
    <div class="iconList down-icon">
      <Icon
        v-for="name in income"
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

@Component({ components: { Notes, Icon } })
export default class CreateTag extends Vue {
  get createTagsError() {
    return this.$store.state.createTagsError;
  }
  layout: string[] = [
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
    "huaZhuang",
    "shengHuo"
  ];
  income: string[] = ["jiangJin", "gongZi", "caiPiao", "others"];
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
  min-height: 100vh;
  background: white;
}
.navbar {
  background: #f08629;
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .leftContent {
    height: 18px;
    width: 18px;
  }
  > .rightContent {
    height: 20px;
    width: 20px;
  }
  > .middleContent {
    font-size: 18px;
  }
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
  color: #f60;
}
</style>