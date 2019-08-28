import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    // 全局状态
    state: {
        test: ''
    },
    // state更改api
    mutations: {
        testChange(state, newValue){}
    },
    // store的计算属性
    getter: {},
    // 用于异步触发mutations里面的方法
    actions: {
        asyncTestChange(content, newValue){
            content.commit('testChange', newValue)
        }
    }
});

export default store
