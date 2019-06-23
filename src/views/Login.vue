<template>
  <div class="loginWrapper">
    <q-input class="loginInput" placeholder="输入一个用户名" v-model="userName"></q-input>
    <!--<q-btn class="loginBtn" @click="login" push color="primary" round icon="fast_forward" />-->
    <q-btn class="loginBtn"
      :loading="loading"
      :percentage="percentage"
      color="primary"
      @click="login"
      style="width: 150px"
    >
      登录
      <template v-slot:loading>
        <q-spinner-gears class="on-left" />
        登录中...
      </template>
    </q-btn>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        userName: '',
        loading: false,
        percentage: 0
      }
    },
    methods: {
      ...mapActions(['setUserName']),
      startComputing () {
        return new Promise(resolve => {
          this.loading = true
          this.percentage = 0
          this.interval = setInterval(() => {
            this.percentage += Math.floor(Math.random() * 20 + 5)
            if (this.percentage >= 100) {
              this.percentage = 0
              this.loading = false
              clearInterval(this.interval)
              resolve()
            }
          }, 200)
        })
      },
      async login () {
        if (!this.userName) return
        await this.startComputing()
        this.setUserName(this.userName)
        let users = { name: this.userName, online: 1 }
        this.$socket.emit('login', users)
      }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    }
  }
</script>

<style lang="stylus" scoped>
  .loginWrapper
    text-align center
    transform all .8s
    .loginInput
    >>>
      .q-field__native
        width 200px
        text-align center
    .loginBtn
      margin-top 20px
  .fade
    opacity 0
</style>
