export default {
    path: '/refund',
    name: 'refund',
    meta: {
        breadcrumb: [{
            label: '财务管理',
            to: '/'
        }, {
            label: '到账退款',
            to: '/'
        }]
    },
    component: () => import('./refund.vue')
}