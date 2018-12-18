<template>
  <div class="side-menu-wrapper">
    <slot></slot> 
    <!-- <Menu ref="menu"  :active-name="activeName"  >
      <template v-for="item in menuList">
          <menu-item :name="getNameOrHref(item)" :key="`menu-${item.name}`"><common-icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
      </template>
    </Menu> -->
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'SideMenu',
  mixins: [ mixin ],
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
  }
}
</script>

<style lang="less">
@import './side-menu.less';
</style>