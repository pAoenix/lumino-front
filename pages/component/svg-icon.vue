<template>
	<view class="svg-icon" :class="class" :style="{ width: width,height: height }">
		<image class="svg_img" :src="svgSrc" mode="aspectFit" />
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				required: true
			},
			height: {
				type: String,
				default: '30px'
			},
			class: {
				type: String,
				default: ''
			},
			width: {
				type: String,
				default: '30px'
			},
		},
		computed: {
			svgSrc() {
				// 返回SVG文件路径
				return `/static/svg-icon/${this.name}.svg`;
			}
		}
	}
</script>

<style scoped>
	.svg-icon {
		width: 50px;
		height: 50px;
	}

	.svg_img {
		width: 100%;
		height: 100%;
	}
</style>