export const refundCache = state => {
    /*
    * 这里一定要返回一个新的对象，因为state里的数据只能由mutation改变
    * 如果直接返回：return state.caches.refund
    * 那么在页面中赋值的时候：this.formValue = state.caches.refund;
    * 这个时候相当于是直接把state.caches.refund的引用付给this.formValue
    * 一旦this.formValue改变，state.caches.refund也会跟着变，这样vuex的严格模式下就会报错
    * ps: 非引用类型可以直接返回
    * */
    return { ...state.caches.refund };
};


