import Vue from 'vue'
import axios from 'axios'

export default new class Mixins{
	constructor(){
		// 注册网络请求
		this.axios = this.netWork();
	}

    netWork(){
    	// 网络请求
		axios.defaults.baseURL ='http://192.168.3.36:9101/';
		axios.defaults.withCredentials = true;  // 是否允许携带cookie-
		axios.defaults.headers = {'Content-Type': 'application/json'};    //设置请求头
		axios.defaults.timeout = 10000;
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

		return axios;
    }

    install(){
		let self = this;
    	Vue.mixin({
    		data(){
    			return {
    				fetch: self.axios
    			}
    		},
    		methods: {
    			// 序列化
    			parse(obj){
    				return JSON.parse(JSON.stringify(obj));
    			},
    			stringify(obj){
				    return JSON.stringify(obj);
				},
				// 路由跳转
			    push(param){
					this.$router.push(param);
			    },
				// 返回
				pop(){this.$router.go(-1)},
				// 退出
				quit(){
					// 清除本地所有数据
					window.localStorage.clear();
					this.push('/loginAndRegister');
				},
				getTimer(){
					function double(val){
						if (val < 10) val = '0' + val;
						return val;
					}
					let nowTimer = new Date(),
						year = double(nowTimer.getFullYear()),
						month = double(nowTimer.getMonth() + 1),
						date = double(nowTimer.getDate() + 1),
						hours = double(nowTimer.getHours()),
						minutes = double(nowTimer.getMinutes()),
						seconds = double(nowTimer.getSeconds());

					return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
				},
				getItem(name){
					let result = window.localStorage.getItem(name);
					return JSON.parse(result);
				},
				setItem(name, value){
					window.localStorage.setItem(name, JSON.stringify(value));
				}
    		}
    	})
    }
}
