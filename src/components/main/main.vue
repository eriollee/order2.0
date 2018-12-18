<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu :menu-list="menuList">
 
      </side-menu>
    </Sider>
  </Layout>
</template>

<script>
import './main.less'
import SideMenu from './components/side-menu'
import routers from '@/router/routers'
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'Main',
  props: {
    msg: String
  },
  components: {
    SideMenu
  },
  data () {
    return {
      collapsed: false
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
