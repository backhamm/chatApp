<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="home"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/about" exact>
          <q-item-section avatar>
            <q-icon name="info"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-label header>Essential Links</q-item-label>
        <div v-if="checkLogin">
          <q-item v-for="val in userList" :key="val.id" clickable>
            <q-item-section avatar>
              <q-icon name=""/>
            </q-item-section>
            <q-item-section>
              <q-item-label :style="val.online ? fontColor : null">{{val.name}}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="loginOut">
            <q-item-section avatar>
              <q-icon name="power_settings_new"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>退出</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'LayoutDefault',

    data () {
      return {
        leftDrawerOpen: this.$q.platform.is.desktop,
        fontColor: {
          color: '#42a5f5'
        }
      }
    },
    computed: {
      ...mapState(['userName', 'userList']),
      checkLogin () {
        return this.userName !== ''
      }
    },
    methods: {
      ...mapActions(['setUserName']),
      loginOut () {
        this.$q.dialog({
          title: '',
          message: '确定退出？'
        }).onOk(() => {
          this.loginOutFun()
        })
      },
      loginOutFun () {
        this.userList && this.$socket.emit('logout', this.userName)
        this.setUserName('')
        window.sessionStorage.removeItem('userName')
        this.leftDrawerOpen = !this.leftDrawerOpen
      }
    }
  }
</script>
