<template>
	<view>
		查看详情
	</view>
</template>

<script>
	export default {
		data() {
			return {
				updateAcconutData: null
			}
		},
		onShow: function() {
			const accounts = getApp().globalData.accountBookList;
			const users = getApp().globalData.userList;
			const data = getApp().globalData.updateAcconutData;
			console.log(data);
			this.updateAcconutData = data
			getApp().globalData.updateAcconutData = null;
		},
		methods: {

		}
	}
</script>

<style>

</style>