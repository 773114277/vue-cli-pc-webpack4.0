import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '../static/css/global.css'   // 全局样式
import Mixins from './mixin'

Vue.use(ElementUI);
Vue.use(Mixins);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    components: {App},
    template: '<App/>'
}).$mount('#app');
