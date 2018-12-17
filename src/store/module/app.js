import {
    getMenuByRouter
} from '@/libs/util'

export default {
    state: {
    },
    getters: {
      menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    },
}