<template>
  <Layout>
    <Tabs :data-source="typeList" :value.sync=" type " classPrefix="type" />
    <Tabs :data-source="scheduleList" :value.sync=" schedule " classPrefix="schedule" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";

@Component({
  components: { Tabs }
})
export default class Statistics extends Vue {
  type = "-";
  schedule = "day";
  typeList = [
    { value: "-", text: "支出" },
    { value: "+", text: "收入" }
  ];
  scheduleList = [
    { value: "day", text: "按天" },
    { value: "week", text: "按周" },
    { value: "month", text: "按月" }
  ];
}
</script>

<style lang="scss" scoped>
::v-deep .type-tab-item {
  background: white;
  &.selected {
    background: #c4c4c4;
  }
  &::after {
    display: none;
  }
}
::v-deep .schedule-tab-item {
  font-size: 18px;
  height: 48px;
}
</style>