<template>
  <div>
    <Layout prefix="layout">
      <NumberPad :value.sync="record.amount" @saveRecord="saveRecord()" />
      <Tabs :dataSource="typeList" :value.sync="record.type" />
      <Notes fileName="备注" placeholder="请在这里输入备注" :inputValue.sync="record.notes" />
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

@Component({
  components: { Tags, Notes, Tabs, NumberPad },
  computed: {
    recordList() {
      return this.$store.state.recordList;
    }
  }
})
export default class Money extends Vue {
  typeList = [
    { value: "-", text: "支出" },
    { value: "+", text: "收入" }
  ];
  record: RecordItem = {
    tags: [],
    iconName: "",
    notes: "",
    type: "-",
    amount: 0
  };
  created() {
    this.$store.commit("fetchRecord");
  }
  onchangeTags(value: Tag[]) {
    this.record.tags = value;
  }
  saveRecord() {
    this.$store.commit("addRecord", this.record);
    window.alert("已保存");
    this.record.notes = "";
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
</style>