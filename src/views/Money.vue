<template>
  <div>
    <Layout prefix="layout">
      <NumberPad :value.sync="record.amount" @saveRecord="saveRecord()" :success.sync="success" />
      <Tabs :dataSource="typeList" :value.sync="record.type" classPrefix="type" />
      <Notes
        fileName="备注"
        maxlength="20"
        placeholder="请在这里输入备注，20字符以内"
        :inputValue.sync="record.notes"
      />
      <Notes fileName="日期" inputType="date" :inputValue.sync="record.createAt" />
      <Tags @update:value="onchangeTags" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Tabs from "@/components/Tabs.vue";
import Notes from "@/components/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import dayjs from "dayjs";

@Component({
  components: { Tags, Notes, Tabs, NumberPad },
  computed: {
    recordList() {
      return this.$store.state.recordList;
    }
  }
})
export default class Money extends Vue {
  success = true;
  typeList = [
    { value: "-", text: "支出" },
    { value: "+", text: "收入" }
  ];
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createAt: dayjs().format("YYYY-MM-DD")
  };
  created() {
    this.$store.commit("fetchRecord");
  }
  onchangeTags(value: Tag[]) {
    this.record.tags = value;
  }
  saveRecord() {
    if (this.record.tags.length === 0) {
      this.success = false;
      return window.alert("请选择一个标签");
    }
    if (this.record.createAt === "") {
      this.success = false;
      return window.alert("请选择一个日期");
    }
    this.success = true;
    this.$store.commit("addRecord", this.record);
    this.record.notes = "";
    return window.alert("已保存");
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
  background: #fdad35;
}
</style>
<style lang="scss" scoped>
::v-deep .type-tab-item::after {
  display: none;
}
</style>