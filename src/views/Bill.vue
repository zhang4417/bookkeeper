<template>
  <Layout>
    <Tabs :data-source="typeList" :value.sync=" type " classPrefix="type" />
    <Tabs :data-source="scheduleList" :value.sync=" schedule " classPrefix="schedule" />
    <ul v-if="groupList.length>0" class="group-wraper">
      <li class="group" v-for="group in groupList" :key="group.title">
        <h1 class="title">
          {{beautiful(group.title)}}
          <span>¥{{group.total}}</span>
        </h1>
        <div class="item-wraper" v-for="item in group.items" :key="item.createAt">
          <router-link class="item" :to=" `/bill/record/${item.createAt}`">
            <Icon :name="item.tags[0].name" />
            <span class="tags">{{item.tags[0].value}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>¥{{item.amount}}</span>
          </router-link>
        </div>
      </li>
    </ul>
    <div v-else class="xxx-wraper">
      <Icon name="null" class="xxx" />
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
import Icon from "@/components/Icon.vue";

type HashItem = {
  title: string;
  total: number;
  items: RecordItem[];
};
@Component({
  components: { Tabs }
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
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }

  get groupList() {
    const newList = clone(this.recordList)
      .filter(item => item.type === this.type)
      .sort(
        (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
      );
    //
    if (newList.length === 0) {
      return [];
    } else {
      const timeByday = dayjs(newList[0].createAt).format("YYYY-MM-DD");
      // let allAmount = newList.reduce((sum, item) => sum + item.amount, 0);
      const hashTab: HashItem[] = [
        {
          title: timeByday,
          total: newList[0].amount,
          items: [newList[0]]
        }
      ];

      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = hashTab[hashTab.length - 1];
        if (this.schedule === "day") {
          if (dayjs(current.createAt).isSame(dayjs(last.title), "day")) {
            last.total += current.amount;
            last.items.push(current);
          } else {
            hashTab.push({
              title: dayjs(newList[i].createAt).format("YYYY-MM-DD"),
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
              title: dayjs(newList[i].createAt).format("YYYY-MM-DD"),
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
              title: dayjs(newList[i].createAt).format("YYYY-MM-DD"),
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
        return dayjs(item).format("YYYY年M月D日");
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
  background: #c4c4c4;
  &.selected {
    background: #f0c229;
  }
  &::after {
    background: #f0c229;
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
  }
  .tags {
    width: 20%;
  }
}
.title {
  @extend %item;
  font-size: 18px;
}
.xxx-wraper {
  max-height: 200px;
  max-width: 200px;
  padding: 16px;
  margin: 100px auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .xxx {
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
</style>