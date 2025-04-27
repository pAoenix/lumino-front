import App from './App'
import messages from './locale/index'

let i18nConfig = {
	locale: uni.getLocale(),
	messages
}

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
	// 添加全局参数
	app.config.globalProperties.$baseURL = 'https://happyall.xyz'

	app.use(uviewPlus);
	app.use(i18n)
	return {
		app
	}
}