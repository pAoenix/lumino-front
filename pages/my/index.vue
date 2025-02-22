<template>
	<view class="my">
		<view class="my_warpper u-cell-group">
			<view class="u-m-r-30">
				<up-avatar :src="pic" size="120"></up-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20 u-tips-color">uview plus</view>
				<view class="u-font-14 u-tips-color">微信号:test</view>
			</view>
			<view class="u-m-l-a u-p-10">
				<up-icon style="margin-right: 10px;" name="scan" color="#fff" size="28"></up-icon>
				<up-icon name="arrow-right" color="#fff" size="28"></up-icon>
			</view>
		</view>

		<view class="u-m-t-20">
			<up-cell-group>
				<up-cell icon="rmb-circle" title="支付"></up-cell>
			</up-cell-group>
		</view>

		<view class="u-m-t-20">
			<up-cell-group>
				<up-cell icon="star" title="家庭组"></up-cell>
				<up-cell icon="photo" title="账单"></up-cell>
				<up-cell icon="coupon" title="卡券"></up-cell>
				<up-cell icon="heart" title="关注"></up-cell>
			</up-cell-group>
		</view>

		<view class="u-m-t-20">
			<up-cell-group>
				<up-cell icon="setting" title="设置"></up-cell>
			</up-cell-group>
		</view>
	</view>
	<CustomTabbar :selected="4" />
</template>

<script>
	import CustomTabbar from "@/pages/component/custom-tabbar.vue";
	export default {
		components: {
			CustomTabbar,
		},
		data() {
			return {
				pic: '/static/logo.png',
				show: true
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.my {
		padding-bottom: calc(60px + env(safe - area - inset - bottom));

		.my_warpper {
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			padding: 30px 10px 30px 30px;
			box-sizing: border-box;
			background: #55c9c9;
		}
	}

	page {
		background-color: #ededed;
	}

	.u-m-r-30 {
		margin-right: 30px;
	}

	.u-m-t-20 {
		margin-bottom: 20px;
	}

	.u-font-18 {
		font-size: 18px;
	}

	.u-font-14 {
		font-size: 14px;
	}

	.u-p-b-20 {
		padding-bottom: 20px;
		box-sizing: border-box;
	}

	.u-tips-color {
		color: #fff;
	}

	.u-m-l-a {
		margin-left: auto;
		display: flex;
	}

	.u-p-10 {
		box-sizing: border-box;
		padding: 10px;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}

	.u-cell-group {
		background-color: #fff;
	}
</style>