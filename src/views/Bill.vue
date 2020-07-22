<template>
  <Layout>
    <Tabs :data-source="typeList" :value.sync=" type " classPrefix="type" />
    <Tabs :data-source="scheduleList" :value.sync=" schedule " classPrefix="schedule" />
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="polar" />
    </div>
    <ul v-if="groupList.length>0" class="group-wraper">
      <li class="group" v-for="group in groupList" :key="group.title">
        <h1 class="title">
          {{beautiful(group.title)}}
          <span v-if="group.items[0].type==='-'">-¥{{group.total}}</span>
          <span v-else>¥{{group.total}}</span>
        </h1>
        <div class="item-wraper" v-for="item in group.items" :key="item.id">
          <router-link class="item" :to=" `/bill/record/${item.id}`">
            <Icon :name="item.tags[0].name" />
            <span class="tags">{{item.tags[0].value}}</span>
            <span class="notes">{{item.notes}}</span>
            <span class="amount" v-if="item.type==='-'">-¥{{item.amount}}</span>
            <span class="amount" v-else>¥{{item.amount}}</span>
          </router-link>
        </div>
      </li>
    </ul>

    <div v-else class="null-wraper">
      <Icon name="null" class="null" />
      <span class="message">你还没添加任何记录</span>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from "@/components/Chart.vue";

type HashItem = {
  title: string;
  total: number;
  items: RecordItem[];
};
@Component({
  components: { Tabs, Chart }
})
export default class Bill extends Vue {
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
  created() {
    this.$store.commit("fetchRecord");
  }
  mounted() {
    const chartWrapper = this.$refs.chartWrapper as HTMLDivElement;
    chartWrapper.scrollLeft = chartWrapper.scrollWidth;
  }
  get chartData() {
    const array = []; //[{date:7.3,amount:100,tags:['吃饭','睡觉']}]
    for (let i = 0; i < 29; i++) {
      const createAt = dayjs()
        .subtract(i, "day")
        .format("YYYY-MM-DD");
      const amount = this.recordList
        .filter(item => item.type === this.type)
        .filter(r => r.createAt === createAt)
        .reduce((sum, r) => {
          return sum + r.amount;
        }, 0);
      array.push({ date: createAt, amount: amount });
    }
    const arrayRange = array.sort(
      (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
    );
    return arrayRange;
  }
  get polar() {
    const keys = this.chartData.map(d => d.date);
    const values = this.chartData.map(a => a.amount);
    const type = this.typeList.filter(i => i.value === this.type)[0].text;
    return {
      title: {
        text: `最近30天${type}`,
        right: "10",
        textStyle: {
          fontSize: "18px",
          color: "#333"
        }
      },
      tooltip: { show: true, formatter: "{a}<br/>{b}: ¥{c}" },
      grid: {
        left: 0,
        right: 0
      },
      xAxis: {
        data: keys,
        axisLabel: {
          align: "center",
          formatter: function(value: string) {
            return value.substr(5);
          }
        },
        axisTick: {
          show: true,
          alignWithLabel: true
        }
      },
      yAxis: {
        axisLine: { show: false }
      },
      series: [
        {
          name: type,
          type: "bar",
          data: values,
          showBackground: false,
          backgroundStyle: {
            color: "rgba(220, 220, 220, 0.8)"
          }
        }
      ]
    };
  }

  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }

  get groupList() {
    const sameTypeRecord = clone(this.recordList)
      .filter(item => item.type === this.type)
      .sort(
        (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
      );
    if (sameTypeRecord.length === 0) {
      return [];
    } else {
      // let allAmount = sameTypeRecord.reduce((sum, item) => sum + item.amount, 0);
      const hashTab: HashItem[] = [
        {
          title: sameTypeRecord[0].createAt,
          total: sameTypeRecord[0].amount,
          items: [sameTypeRecord[0]]
        }
      ];
      for (let i = 1; i < sameTypeRecord.length; i++) {
        const current = sameTypeRecord[i];
        const last = hashTab[hashTab.length - 1];
        if (this.schedule === "day") {
          if (dayjs(current.createAt).isSame(dayjs(last.title), "day")) {
            last.total += current.amount;
            last.items.push(current);
          } else {
            hashTab.push({
              title: current.createAt,
              total: current.amount,
              items: [current]
            });
          }
        }
        if (this.schedule === "week") {
          if (dayjs(current.createAt).isSame(dayjs(last.title), "week")) {
            last.total += current.amount;
            last.items.push(current);
          } else {
            hashTab.push({
              title: current.createAt,
              total: current.amount,
              items: [current]
            });
          }
        }
        if (this.schedule === "month") {
          if (dayjs(current.createAt).isSame(dayjs(last.title), "month")) {
            last.total += current.amount;
            last.items.push(current);
          } else {
            hashTab.push({
              title: current.createAt,
              total: current.amount,
              items: [current]
            });
          }
        }
      }
      return hashTab;
    }
  }
  beautiful(item: string) {
    const now = dayjs();
    if (this.schedule === "day") {
      if (dayjs(item).isSame(now, "day")) {
        return "今天";
      } else if (dayjs(item).isSame(now.subtract(1, "day"), "day")) {
        return "昨天";
      } else if (dayjs(item).isSame(now.subtract(2, "day"), "day")) {
        return "前天";
      } else {
        return dayjs(item).format("YYYY年M月D日");
      }
    }
    if (this.schedule === "week") {
      if (dayjs(item).isSame(now, "week")) {
        return "本周";
      } else if (dayjs(item).isSame(now.subtract(1, "week"), "week")) {
        return "上周";
      } else if (dayjs(item).isSame(now.subtract(2, "week"), "week")) {
        return "上上周";
      } else {
        return dayjs(item).format("YYYY年M月D日") + "一周";
      }
    }
    if (this.schedule === "month") {
      if (dayjs(item).isSame(now, "month")) {
        return "本月";
      } else if (dayjs(item).isSame(now.subtract(1, "month"), "month")) {
        return "上月";
      } else if (dayjs(item).isSame(now.subtract(2, "month"), "month")) {
        return "上上月";
      } else {
        return dayjs(item).format("YYYY年M月");
      }
    }
  }
  tagsString(tags: Tag[]) {
    return tags.length === 0 ? "空" : tags.join("，");
  }
}
</script>

<style lang="scss" scoped>
::v-deep .type-tab-item {
  background: #e6cf83;
  &.selected {
    background: #f0c229;
  }
  &::after {
    display: none;
  }
}
::v-deep .schedule-tab-item {
  font-size: 18px;
  height: 48px;
  &.selected {
    background: #f0c229;
  }
  &::after {
    display: none;
  }
}
%item {
  min-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
}
.item {
  @extend %item;
  border-bottom: 1px solid #f5f5f5;
  background: white;
  .notes {
    margin-right: auto;
    margin-left: 8px;
    width: 50%;
    word-wrap: break-word;
  }
  .tags {
    width: 25%;
  }
}
.title {
  @extend %item;
  font-size: 18px;
}
.null-wraper {
  max-height: 200px;
  max-width: 200px;
  padding: 16px;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .null {
    &.icon {
      min-width: 100px;
      min-height: 100px;
    }
  }
  .message {
    font-size: 16px;
    padding-top: 16px;
    color: #c4c4c4;
  }
}
.chart {
  width: 500vw;
  &-wrapper {
    overflow: auto;
  }
}
</style>