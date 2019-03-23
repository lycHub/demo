export default {
    path: '/phoneMap',
    name: 'phoneMap',
    meta: {
        breadcrumb: [{
            label: '呼叫中心',
            to: '/'
        }, {
            label: '话机映射',
            to: '/'
        }]
    },
    component: () => import('./phoneMap.vue')
}