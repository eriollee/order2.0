import {
    getMenuByRouter,
    getHomeRoute
} from '@/libs/util'
import config from '@/config'
import router from '@/router'
import routers from '@/router/routers'
const { homeName } = config

export default {
    state: {
        homeRoute: {},
    },
    getters: {
      menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    },
    mutations: {
        setHomeRoute (state, routes) {
          state.homeRoute = getHomeRoute(routes, homeName)
        }
    }
}

