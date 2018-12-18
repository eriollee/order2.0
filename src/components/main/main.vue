<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu :menu-list="menuList">
        <div class="logo-con">
          <img :src="maxLogo" key="max-logo" />
        </div>
      </side-menu>
    </Sider>    
    <Layout>
      <Header class="header-con">
        <!-- <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :message-unread-count="unreadCount" :user-avator="userAvator"/>
          <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>
          <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store>
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
        </header-bar> -->
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <!-- <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive> -->
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import './main.less'
import SideMenu from './components/side-menu'
import routers from '@/router/routers'
import ABackTop from './components/a-back-top'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import maxLogo from '@/assets/images/logo.jpg'

export default {
  name: 'Main',
  props: {
    msg: String
  },
  components: {
    SideMenu,
    ABackTop
  },
  data () {
    return {
      collapsed: false,
      maxLogo,
    }
  },
  mounted () {
    this.setHomeRoute(routers)
  },
  computed: {
    menuList () {
      console.log('menuList')
      return this.$store.getters.menuList
    },
  },
  methods: {
    ...mapMutations([
      'setHomeRoute'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
