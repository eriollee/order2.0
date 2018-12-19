import Main from '@/components/main'

export default [
    {
        path: '/',
        name: 'login',
        meta: {
            icon: 'md-notifications',
            title: '订单统计'
        },
        component: Main,
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
            path: 'order_list',
            name: 'order_list',
            meta: {
              icon: 'ios-hammer',
              title: '订单管理',
              beforeCloseName: 'before_close_normal'
            },
            component: () => import('@/view/order-list.vue')
          }
        ]
      },
]