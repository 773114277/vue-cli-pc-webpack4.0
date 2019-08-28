import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import '../static/css/global.css'   // 全局样式

Vue.use(ElementUI);

// 网络请求
axios.defaults.baseURL =' http://127.0.0.1/';
// axios.defaults.withCredentials = true;  // 是否允许携带cookie
axios.defaults.timeout = 5000;
axios.defaults.validateStatus = function (status) {
    //验证响应状态码=>自定义成功失败规则：状态码以2/3开头算作成功
    let result = /^(2|3)\d{2}$/.test(status);
    if (!result) {
        let errorMsg = '';
        switch(status){
            case 404:
                errorMsg = '网址错误';
                break;
            default:
                errorMsg = '请求失败';
        }
        throw new Error(errorMsg + '， 错误码为：' + status);
    }
    return result;
};

Vue.prototype.$axios = axios;

// 序列化
Vue.prototype.parse = function parse(obj){
    return JSON.parse(JSON.stringify(obj));
};
Vue.prototype.stringify = function stringify(obj){
    JSON.stringify(obj);
};

Vue.config.productionTip = false;

/**
 * 全局前置导航守卫 当点击路由之后使滚动条始终保持在顶部
 * to: Route: 即将要进入的目标 路由对象
 * from: Route: 当前导航正要离开的路由
 * next: Function: 一定要调用该方法来 resolve 这个钩子。
 */
router.beforeEach((to, from, next) => {
    // chrome
    document.body.scrollTop = 0;
    // firefox
    document.documentElement.scrollTop = 0;
    // safari
    window.pageYOffset = 0;
    next()
});

new Vue({
    router,
    store,
    components: {App},
    template: '<App/>'
}).$mount('#app');
