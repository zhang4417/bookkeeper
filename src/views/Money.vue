<template>
  <div>
    <Layout prefix="layout">
      <NumberPad :value.sync="record.amount" @saveRecord="saveRecordList()" />
      <Types :value.sync="record.type" />
      {{recordList}}
      <Notes @update:value="onchangeNotes" />
      <Tags :tagContent.sync="tags" @update:value="onchangeTags" />
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
import recordListModel from "@/model/recordListModel.ts";
import tagsListModel from "../model/tagsListModel";

@Component({
  components: { Layout, Tags, Notes, Types, NumberPad }
})
export default class Money extends Vue {
  tags = tagsListModel.data;
  recordList: RecordItem[] = recordListModel.fetch();
  record: RecordItem = { tags: [], notes: "", type: "-", amount: "0" };
  onchangeTags(value: string[]) {
    this.record.tags = value;
  }
  onchangeNotes(value: string) {
    this.record.notes = value;
  }
  saveRecordList() {
    const record2 = recordListModel.clone(this.record); //深拷贝record
    record2.createAt = new Date();
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onrecordListChanged() {
    recordListModel.save(this.recordList);
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