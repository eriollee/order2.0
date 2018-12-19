import Main from '@/components/main'

export default [
    {
        path: '/',
        redirect: '/order/manager',
        name: '_order_manager',
        meta: {
            icon: 'md-notifications',
            title: '订单统计'
        },
        component: Main,
        children: [
            {
              path: 'order/manager',
              name: 'order_manager',
              meta: {
                icon: 'md-notifications',
                title: '订单统计',
              },
              component: () => import('@/view/order-manager/order-manager.vue')
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
            path: 'list',
            name: 'order_list',
            meta: {
              icon: 'ios-hammer',
              title: '订单管理',
              beforeCloseName: 'before_close_normal'
            },
            component: () => import('@/view/order-list/order-list.vue')
          }
        ]
      },
]