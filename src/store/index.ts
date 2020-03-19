import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tags: [{ value: "娱乐", name: "yuLe" }, { value: "购物", name: "gouWu" }, { value: "交通", name: "jiaoTong" }, { value: "生活", name: "riYongPin" }] as Tag[],
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
      const tagsValue = state.tags.map(item => item.value)
      if (tagsValue.indexOf(record.value!) >= 0) {
        return window.alert('Duplicated')
      }
      state.tags.push(record!)
      store.commit('saveTags')
      window.alert('Success')
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

      record2.createAt = new Date().toISOString();
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