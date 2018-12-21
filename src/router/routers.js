import Main from '@/components/main'

export default [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login - 登录',
        hideInMenu: true
      },
      component: () => import('@/view/login/login.vue')
    },
    {
        path: '/',
        redirect: '/order/list',
        name: '_order_list',
        meta: {
            icon: 'md-notifications',
            title: '订单统计'
        },
        component: Main,
        children: [
            {
              path: 'order/list',
              name: 'order_list',
              meta: {
                icon: 'md-notifications',
                title: '订单统计',
              },
              component: () => import('@/view/order-list/order-list.vue')
            }
          ]
    },
    {
        path: '/order',
        name: 'order',
        meta: {
          hideInBread: true
        },
        component: Main,
        children: [
          {
            path: 'manager',
            name: 'order_manager',
            meta: {
              icon: 'ios-hammer',
              title: '订单管理',
              beforeCloseName: 'before_close_normal'
            },
            component: () => import('@/view/order-manager/order-manager.vue')
          }
        ]
      },
]