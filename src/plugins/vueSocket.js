import Vue from 'vue'
import store from '../store/store'
import VueSocketIo from 'vue-socket.io'

Vue.use(new VueSocketIo({
  debug: true,
  connection: 'ws://127.0.0.1:3000',
  vuex: {
    store,
    actionPrefix: 'socket_'
  },
  options: {}
}))
