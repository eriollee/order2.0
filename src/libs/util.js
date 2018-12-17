export const getMenuByRouter = (list, access) => {
    let res = []
    forEach(list, item => {
      if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
        let obj = {
          icon: (item.meta && item.meta.icon) || '',
          name: item.name,
          meta: item.meta
        }

        //如有子菜单递归调用
        if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
          obj.children = getMenuByRouter(item.children, access)
        }
        if (item.meta && item.meta.href) obj.href = item.meta.href
        if (showThisMenuEle(item, access)) res.push(obj)
      }
    })
    return res
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
    let i = -1
    console.log(routers)
    let len = routers.length
    let homeRoute = {}
    while (++i < len) {
      let item = routers[i]
      if (item.children && item.children.length) {
        let res = getHomeRoute(item.children, homeName)
        if (res.name) return res
      } else {
        if (item.name === homeName) homeRoute = item
      }
    }
    console.log(homeRoute)
    return homeRoute
  }

//是否有子菜单
export const hasChild = (item) => {
    return item.children && item.children.length !== 0
}
  
//是否有子菜单
const showThisMenuEle = (item, access) => {
    if (item.meta && item.meta.access && item.meta.access.length) {
      if (hasOneOf(item.meta.access, access)) return true
      else return false
    } else return true
}