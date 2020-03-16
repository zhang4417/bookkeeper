<template>
  <div>
    <Layout prefix="layout">
      <NumberPad :value.sync="record.amount" @saveRecord="saveRecord()" />
      <Types :value.sync="record.type" />
      <Notes fileName="备注" placeholder="请在这里输入备注" @update:value="onchangeNotes" />
      <div>{{recordList}}</div>
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
import { Component } from "vue-property-decorator";

@Component({
  components: { Tags, Notes, Types, NumberPad },
  computed: {
    recordList() {
      return this.$store.state.recordList;
    }
  }
})
export default class Money extends Vue {
  record: RecordItem = { tags: [], notes: "", type: "-", amount: "0" };
  created() {
    this.$store.commit("fetchRecord");
  }
  onchangeTags(value: string[]) {
    this.record.tags = value;
  }
  onchangeNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    this.$store.commit("addRecord", this.record);
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