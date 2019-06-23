<template>
  <q-page class="flex flex-center">
    <Login v-if="userName === ''"></Login>
    <div class="wrapper" v-else>
      <div class="chatMain" ref="chatMain">
        <q-chat-message label='Sunday, 19th' class="timeTitle"/>

        <q-chat-message v-for="(val, i) in msgList" :key="i"
                        :name="val.sendName"
                        :avatar="`http://flathash.com/${val.sendName}`"
                        :text="val.textArray"
                        :stamp="val.stamp | dataFilter"
                        :sent="val.sendName === userName"
        />
      </div>
      <q-input class="inputs" v-model="inputVal" @keyup.13="sendMsg">
        <template v-slot:prepend>
          <q-icon name="stars"/>
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="inputVal = ''" class="cursor-pointer" />
        </template>
      </q-input>
      <q-btn label="send" color="primary" @click="sendMsg" style="margin-top: 10px"/>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped>
  .wrapper
    width 400px
    height 700px
    padding 15px
    border 1px solid #ccc
    display flex
    flex-direction column

    .chatMain
      overflow auto
      height calc(700px - 86px)

    .q-scroll-area
      flex 1

    >>>
      .q-field__control
        height 40px

        .q-field__marginal
          height 40px
</style>

<script>
  import { mapState, mapActions } from 'vuex'
  import Login from './Login'

  export default {
    data () {
      return {
        opened: true,
        avatar: 'http://www.quasarchs.com/quasar-play/android/statics/boy-avatar.png',
        inputVal: ''
      }
    },
    filters: {
      dataFilter (val) {
        return new Date(val).toLocaleString()
      }
    },
    mounted () {
    },
    updated () {
      if (this.userName) {
        let chatMain = this.$refs.chatMain
        chatMain.scrollTop = chatMain.scrollHeight
      }
    },
    computed: {
      ...mapState(['userName', 'list']),
      msgList () {
        let list = []
        let msgList = JSON.parse(JSON.stringify(this.list))
        for (let i = 0; i < msgList.length; i++) {
          let item = msgList[i]
          item.textArray = [item.text]
          let lstListItem = list[list.length - 1]
          if (lstListItem && lstListItem.sendName === item.sendName) {
            list[list.length - 1].textArray.push(item.text)
          } else {
            list.push(item)
          }
        }
        return list
      }
    },
    methods: {
      ...mapActions(['setUserName']),
      sendMsg () {
        if (this.inputVal.trim() === '') return
        let time = new Date().getTime()
        let msgData = {
          sendName: this.userName,
          avatar: this.avatar,
          text: this.inputVal,
          stamp: time
        }
        this.inputVal = ''
        this.$socket.emit('userInput', msgData)
      }
    },
    components: {
      Login
    }
  }
</script>
