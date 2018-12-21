<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu :menu-list="menuList"  :active-name="$route.name"  @on-select="turnToPage">
        <div class="logo-con">
          <img :src="maxLogo" key="max-logo" />
        </div>
      </side-menu>
    </Sider>    
    <Layout>
      <Header class="header-con">
        <header-bar  >
             <user   :user-name="userName"/>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
              <router-view/>
            <!-- <keep-alive :include="order_list" >
              <router-view/>
            </keep-alive> -->
            <!-- <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop> -->
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import './main.less'
import SideMenu from './components/side-menu'
import User from './components/user'
import routers from '@/router/routers'
import ABackTop from './components/a-back-top'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import maxLogo from '@/assets/images/logo.jpg'
import HeaderBar from './components/header-bar'

export default {
  name: 'Main',
  props: {
    msg: String
  },
  components: {
    SideMenu,
    ABackTop,
    User,
    HeaderBar
  },
  data () {
    return {
      collapsed: false,
      maxLogo,
    }
  },
  mounted () {
    // this.setHomeRoute(routers)
  },
  computed: {
    menuList () {
      // console.log('menuList')
      return this.$store.getters.menuList
    },
    userName () {
      return this.$store.state.user.userName
    },
  },
  methods: {
    // ...mapMutations([
    //   'setHomeRoute'
    // ]),
    turnToPage (route) {
      // console.log(route)
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      //如果有链接则跳转
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
