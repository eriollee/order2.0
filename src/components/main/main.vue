<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
         12313213
    </Sider>
  </Layout>
</template>

<script>
export default {
  name: 'Main',
  props: {
    msg: String
  },
  data () {
    return {
      collapsed: false,
      isFullscreen: false
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
