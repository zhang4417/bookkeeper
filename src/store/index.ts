import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tags: ["娱乐", "生活", "奖金", "交通"] as string[],
    recordList: [] as RecordItem[]
  },
  mutations: {
    fetchTags(state) {
      const dataTags = JSON.parse(window.localStorage.getItem('tagsList') || '[]')
      if (dataTags.length === 0) {
        return state.tags
      } else {
        return state.tags = dataTags
      }
    },
    createTags(state) {
      const name = window.prompt('请输入标签名')
      if (name === '') {
        return window.alert('标签名不能为空')
      }
      if (name === null) {
        return;
      }
      if (state.tags.indexOf(name!) >= 0) {
        return window.alert('Duplicated')
      }
      state.tags.push(name!)
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