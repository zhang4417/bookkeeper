import Vue from 'vue'
import Vuex from 'vuex'
import idCreator from '@/lib/identify.ts'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tags: [{ value: "娱乐", name: "yuLe" }, { value: "购物", name: "gouWu" }, { value: "交通", name: "jiaoTong" }, { value: "生活", name: "shengHuo" }, { value: "聚会", name: "juHui" }, { value: "旅行", name: "lvXing" }] as Tag[],
    recordList: [] as RecordItem[]
  },
  mutations: {
    fetchTags(state) {
      const dataTags: Tag[] = JSON.parse(window.localStorage.getItem('tagsList') || '[]')
      if (dataTags.length === 0) {
        return state.tags
      } else {
        return state.tags = dataTags
      }
    },
    createTags(state, record) {
      if (record.value === '') {
        return window.alert('标签名不能为空')
      }
      store.commit('fetchTags')  //获取最新的tags
      const tagsValue = state.tags.map(item => item.value)
      if (tagsValue.indexOf(record.value!) < 0) {
        state.tags.push(record!)
        store.commit('saveTags')
        window.alert('添加成功')
      } else { window.alert('标签名重复') }
    },
    saveTags(state) {
      window.localStorage.setItem('tagsList', JSON.stringify(state.tags))
    },

    fetchRecord(state) {
      state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
      return state.recordList;
    },
    addRecord(state, record: RecordItem) {
      const record2 = JSON.parse(JSON.stringify(record)); //深拷贝record
      record2.id = idCreator()
      //record2.createAt = record2.createAt || new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecord');
    },
    saveRecord(state) {
      window.localStorage.setItem("recordList", JSON.stringify(state.recordList))
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store