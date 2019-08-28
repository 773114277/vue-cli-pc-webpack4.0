import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index'
import components_lzj from './router_lzj'
import components_lm from './router_lm'

const merge = require('webpack-merge');

Vue.use(Router);

export default new Router(merge({
    routes: [
        // index 首页
        { path: '/', redirect: '/index' },
        { path: '/index',name: 'Index',component: Index }
    ]
}, components_lzj, components_lm));
