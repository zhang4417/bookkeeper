<template>
  <div class="name-wraper">
    <div class="navbar">
      <span class="leftContent">
        <Icon name="left" @click="back" />
      </span>
      <div class="middleContent">
        <Icon :name="currentRecord.iconName" />
      </div>
      <span class="rightContent">历史记录</span>
    </div>

    <ul class="notes-wraper">
      <li class="item">
        <span class="type">标签</span>
        <span class="value">{{currentRecord.tag}}</span>
      </li>
      <li class="item">
        <span class="type">金额</span>
        <span class="value">{{currentRecord.amount}}</span>
      </li>
      <li class="item">
        <span class="type">日期</span>
        <span class="value">{{currentRecord.dateTime}}</span>
      </li>
      <Notes
        class="tagInput"
        :fileName="'备注'"
        :placeholder="'请在这里修改备注'"
        :inputValue.sync="currentRecord.note"
      />
    </ul>

    <div class="button-wraper">
      <Button @click="removeRecord">删除记录</Button>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Notes from "@/components/Notes.vue";
import clone from "@/lib/clone";
import Button from "@/components/Button.vue";
import Icon from "@/components/Icon.vue";

@Component({ components: { Notes, Button, Icon } })
export default class EveryRecord extends Vue {
  currentRecord: {
    tag: string;
    iconName: string;
    amount: number;
    dateTime: string;
    note: string;
  } = {
    tag: "string",
    iconName: "",
    amount: 0,
    dateTime: "string",
    note: "string"
  };
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }
  get recordIdList() {
    return this.recordList.map((item: RecordItem) => item.id);
  }
  created() {
    const paramsId = parseInt(this.$route.params.id);
    if (this.recordIdList.indexOf(paramsId) >= 0) {
      const index = clone(this.recordList)
        .map(item => item.id)
        .indexOf(paramsId);
      this.currentRecord.tag = this.recordList[index].tags[0].value;
      this.currentRecord.dateTime = this.recordList[index].createAt;

      this.currentRecord.amount = this.recordList[index].amount;
      this.currentRecord.note = this.recordList[index].notes;
      this.currentRecord.iconName = this.recordList[index].tags[0].name;
    } else {
      this.$router.replace("/404");
    }
  }
  back() {
    const paramsId = parseInt(this.$route.params.id);
    const index = clone(this.recordList)
      .map(item => item.id)
      .indexOf(paramsId);
    this.recordList[index].notes = this.currentRecord.note;
    this.$store.commit("saveRecord");
    this.$router.back();
  }
  removeRecord() {
    const paramsId = parseInt(this.$route.params.id);
    const index = clone(this.recordList)
      .map(item => item.id)
      .indexOf(paramsId);
    this.recordList.splice(index, 1);
    this.$store.commit("saveRecord");
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.name-wraper {
  background: #f5f5f5;
  min-height: 100vh;
}
.navbar {
  background: #f08629;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  > .leftContent {
    height: 18px;
    width: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  > .middleContent {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: white;
  }
  > .rightContent {
    height: 18px;
    width: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.middleContent ::v-deep svg {
  width: 36px;
  height: 36px;
  color: #f08629;
}
.button-wraper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 16px;
}
.notes-wraper {
  > .item {
    display: flex;
    background: #f5f5f5;
    padding-left: 16px;
    font-size: 14px;
    align-items: center;
    > .type {
      margin-right: 16px;
    }
    > .value {
      background: transparent;
      height: 64px;
      flex-grow: 1;
      border: none;
      display: flex;
      align-items: center;
      color: #8f8c8c;
    }
  }
}
</style>