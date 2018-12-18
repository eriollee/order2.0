import HelloWorld from '../components/HelloWorld'
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
    }
]