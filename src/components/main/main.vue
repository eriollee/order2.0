<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
         12313213
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
  data () {
    return {
      collapsed: false
    }
  },
  mounted () {
    this.setHomeRoute(routers)
  },
  computed: {

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
