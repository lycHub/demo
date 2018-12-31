export const user = state => {
    /*
    * 这里一定要返回一个新的对象，因为state里的数据只能由mutation改变
    * 如果直接返回：return state.userInfo
    * 那么在页面中赋值的时候：this.userInfo = state.userInfo;
    * 相当于直接把state.userInfo的引用付给this.userInfo
    * 一旦this.userInfo，state.userInfo也会跟着变，这样vuex的严格模式下就会报错
    * ps: 非引用类型可以直接返回
    * */
    return { ...state.user };
};