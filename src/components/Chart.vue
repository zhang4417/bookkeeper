<template>
  <div ref="wrapper" class="wrapper"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import echarts, { EChartOption } from "echarts";

@Component
export default class EChart extends Vue {
  @Prop() options?: EChartOption;
  mounted() {
    if (this.options === undefined) {
      return console.error("option 为空");
    } else {
      const myChart = echarts.init(this.$refs.wrapper as HTMLDivElement);
      myChart.setOption(this.options);
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 400px;
}
</style>