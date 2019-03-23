export default {
    path: '/refundDetail/:applyId',
    name: 'refundDetail',
    props: true,
    meta: {
        breadcrumb: [{
            label: '财务管理',
            to: '/'
        }, {
            label: '到账退款详情',
            to: '/'
        }]
    },
    component: () => import('./refundDetail.vue')
}