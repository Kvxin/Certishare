import App from './App'

//vue2
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif


//vue3
// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import * as Pinia from 'pinia';
import uviewPlus from '@/uni_modules/uview-plus'
export function createApp() {
	const app = createSSRApp(App);
	app.use(Pinia.createPinia());
	app.use(uviewPlus)
	return {
		app,
		Pinia,
	};
}
// #endif