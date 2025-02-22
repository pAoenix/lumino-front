<template>
	<view class="tab-bar">
		<view v-for="(item, index) in tabList" :key="index" class="tab-item" :class="{ active: selected === index }"
			@tap="switchTab(index)">
			<image class="tab-icon" :class="{ 'tab_active': index == 2 }"
				:src="selected === index ? item.activeIcon : item.icon" />
			<text class="tab-text">{{ item.text }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			selected: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				tabList: [{
						pagePath: "/pages/details/index",
						text: "账本",
						icon: "/static/details.png",
						activeIcon: "/static/detailsHL.png"
					},
					{
						pagePath: "/pages/chart/index",
						text: "图表",
						icon: "/static/chart.png",
						activeIcon: "/static/chartHL.png"
					},
					{
						pagePath: "/pages/index/index",
						text: "用户",
						icon: "/static/add.png",
						activeIcon: "/static/addHL.png"
					},
					{
						pagePath: "/pages/find/index",
						text: "发现",
						icon: "/static/find.png",
						activeIcon: "/static/findHL.png"
					},
					{
						pagePath: "/pages/my/index",
						text: "设置",
						icon: "/static/my.png",
						activeIcon: "/static/myHL.png"
					},
				],
			};
		},
		methods: {
			switchTab(index) {
				const url = this.tabList[index].pagePath;
				if (this.selected !== index) {
					uni.switchTab({
						url
					});
				} else {
					this.$emit('change')
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50px;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		z-index: 1;
		border-top: 1px solid #f0f0f0;
		padding: 10px;
		z-index: 99;
		padding-bottom: env(safe - area - inset - bottom);
	}

	.tab-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #666;
	}

	.tab-item.active {
		color: #55c9c9;
	}

	.tab-icon {
		width: 24px;
		height: 24px;
	}

	.tab_active {
		width: 65px;
		height: 65px;
		position: absolute;
		background: #fff;
		top: -30px;
		left: 50%;
		transform: translateX(-50%);
		padding: 10px;
		border-top: 1px solid #f0f0f0;
		border-radius: 50%;
	}

	.tab-text {
		font-size: 12px;
		margin-top: 2px;
	}
</style>