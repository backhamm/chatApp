import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    userList: [],
    userName: window.sessionStorage.getItem('userName') || ''
  },
  mutations: {
    SET_VALUE (state, [key, val]) {
      state[key] = val
    },
    UPDATE_VALUE (state, [key, val]) {
      state[key].push(val)
    }
  },
  actions: {
    socket_onlineUserList ({ commit }, data) {
      commit('SET_VALUE', ['userList', data])
    },
    socket_messageArr ({ commit }, data) {
      commit('SET_VALUE', ['list', data])
    },
    socket_message ({ commit }, data) {
      commit('UPDATE_VALUE', ['list', data])
    },
    setUserName ({ commit }, value) {
      window.sessionStorage.setItem('userName', value)
      commit('SET_VALUE', ['userName', value])
    }
  }
})
