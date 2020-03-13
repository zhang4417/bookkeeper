<template>
  <div>
    <Layout prefix="layout">
      <NumberPad :value.sync="record.amount" @saveRecord="save()" />
      <Types :value.sync="record.type" />
      {{recordList}}
      <Notes @update:value="onNotes" />
      <Tags :tagContent.sync="tags" @update:value="onTags" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/components/Layout.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import model from "@/model.ts";

type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: string;
    createAt?: Date;
}
@Component({
  components: { Layout, Tags, Notes, Types, NumberPad }
})
export default class Money extends Vue {
  tags = ["日用", "娱乐", "交通", "花呗"];
  recordList: RecordItem[] = JSON.parse(window.localStorage.getItem ('recordList')||'[]');
  record: RecordItem = { tags: [], notes: "", type: "-", amount: "0" };
  onTags(value: string[]) {
    this.record.tags = value;
  }
  onNotes(value: string) {
    this.record.notes = value;
  }
  save() {
    const record2 = JSON.parse(JSON.stringify(this.record)); //深拷贝record
    record2.createAt = new Date();
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onrecordListChanged() {
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
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