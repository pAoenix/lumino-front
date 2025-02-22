import App from './App'
import messages from './locale/index'

let i18nConfig = {
	locale: uni.getLocale(),
	messages
}

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
// 引入 uView Plus
import uviewPlus from '@/uni_modules/uview-plus'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	i18n,
	...App
})
app.use(uviewPlus)
app.$mount()
// #endif


// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import {
	createI18n
} from 'vue-i18n'
const i18n = createI18n(i18nConfig)
// 引入 uView Plus
import uviewPlus from '@/uni_modules/uview-plus'
export function createApp() {
	const app = createSSRApp(App)
	// 使用 uView Plus
	app.use(uviewPlus);
	app.use(i18n)
	return {
		app
	}
}
// #endif