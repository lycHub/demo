export default {
    path: '/refundDetail/:applyId',
    name: 'refundDetail',
    props: true,
    component: () => import('./refundDetail.vue')
}