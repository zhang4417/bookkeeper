<template>
  <div>
    <Layout prefix="layout">
      <NumberPad :value.sync="record.amount" @saveRecord="saveRecord()" />
      <Types :value.sync="record.type" />
      {{recordList}}
      <Notes fileName="备注" placeholder="请在这里输入备注" @update:value="onchangeNotes" />
      <Tags @update:value="onchangeTags" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import recordListModel from "@/model/recordListModel.ts";

@Component({
  components: { Tags, Notes, Types, NumberPad }
})
export default class Money extends Vue {
  tags = window.tagList;
  recordList = recordListModel.fetch();
  record: RecordItem = { tags: [], notes: "", type: "-", amount: "0" };
  onchangeTags(value: string[]) {
    this.record.tags = value;
  }
  onchangeNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    recordListModel.add(this.record);
  }
  @Watch("recordList")
  onrecordListChanged() {
    recordListModel.save();
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