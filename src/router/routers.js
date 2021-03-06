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
      {
        path: '/system',
        name: 'system',
        meta: {
          icon: 'logo-buffer',
          title: '系统管理',
          access: ['ROLE_ADMIN'],
        },
        component: Main,
        children: [
          {
            path: 'list',
            name: 'system_list',
            meta: {
              icon: 'md-trending-up',
              title: '统计列表'
            },
            component: () => import('@/view/system-list/system-list.vue')
          },
          {
            path: 'manager',
            name: 'system_manager',
            meta: {
              icon: 'ios-infinite',
              title: '统计管理'
            },
            component: () => import('@/view/system-manager/system-manager.vue')
          },
        ]
      }
]