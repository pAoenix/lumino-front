<template>
	<view>
		图表
		<SvgIcon name="icon-tixing-fill" />
		<CustomTabbar :selected="1"></CustomTabbar>
	</view>
</template>

<script>
	import SvgIcon from '../component/svg-icon.vue' // 引入svg

	import CustomTabbar from "@/pages/component/custom-tabbar.vue";

	export default {
		components: {
			SvgIcon,
			CustomTabbar,
		},
	};
</script>


<style lang="scss">

</style>