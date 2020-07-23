<template>
  <div ref="wrapper" class="wrapper"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component, Watch } from "vue-property-decorator";
import echarts, { EChartOption, ECharts } from "echarts";

@Component
export default class EChart extends Vue {
  myChart?: ECharts;
  @Prop() options?: EChartOption;
  @Watch("options")
  onOptionsChanged(newVal: EChartOption) {
    if (this.myChart === undefined) return;
    this.myChart.setOption(newVal);
  }
  mounted() {
    if (this.options === undefined) {
      return console.error("option 为空");
    } else {
      this.myChart = echarts.init(this.$refs.wrapper as HTMLDivElement);
      this.myChart.setOption(this.options);
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 40vh;
}
</style>