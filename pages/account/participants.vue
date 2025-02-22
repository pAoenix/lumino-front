<template>
	<view class="participants">
		<view class="participants_all">
			<up-checkbox class="participants-checkbox-group" activeColor="#55c9c9" v-model="allChecked" shape="circle"
				label="全选" @change="allCheckedChange"></up-checkbox>
		</view>
		<up-checkbox-group v-model="accountUser" placement="column" @change="checkboxChange">
			<up-checkbox class="participants-checkbox-group" v-for="(item,index) in userShowList" shape="circle"
				:key="index" activeColor="#55c9c9" :label="item.name" :name="item.id">
				<template #label> <img class="check_img" :src="item.img" alt="" /> {{item.name}}</template>
			</up-checkbox>
		</up-checkbox-group>
		<view class="bill_footer">
			<view class="bill_submit" @click="submit()">
				确认
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allChecked: [],
				accountUser: [],
				accountUserUrls: [],
				userShowList: [],
				userList: [],
			}
		},
		onShow: function() {
			// 人员信息
			const users = getApp().globalData.userList;
			this.userList = users
			const data = getApp().globalData.participantsData;
			this.accountUser = data.accountUser.map(item => item)
			this.accountUserUrls = this.accountUser.map(item => this.userList.find(items => items.id ==
				item).img)
			this.userShowList = []
			users.forEach(item => {
				if (data.accountBookUser?.length && data.accountBookUser.some(items => item.id == items)) {
					this.userShowList.push(item)
				}
			})
			// 清除数据，避免下次读取错误
			// getApp().globalData.participantsData = null;
		},
		methods: {
			checkboxChange(data) {
				this.accountUserUrls = data.map(item => this.userList.find(items => items.id ==
					item).img)
			},
			allCheckedChange(data) {
				if (data) {
					this.accountUser = this.userShowList.map(item => item.id)
					this.accountUserUrls = this.userShowList.map(item => this.userList.find(items => items.id ==
						item.id).img)
				} else {
					this.accountUser = []
					this.accountUserUrls = []
				}
			},
			submit() {
				// 在源页面存储数据
				getApp().globalData.selectUserList = {
					accountUser: this.accountUser,
					accountUserUrls: this.accountUserUrls,
				};
				uni.navigateTo({
					url: `/pages/account/add-bill`
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.participants {
		padding: 20px;
		position: relative;

		.participants_all {
			display: flex;
			flex-direction: row-reverse;
		}

		.participants-checkbox-group {
			&:deep(.u-checkbox__icon-wrap) {
				width: 22px !important;
				height: 22px !important;

				.u-icon__icon {
					font-size: 16px !important;
				}
			}

			&:deep(.u-checkbox__label-wrap) {
				display: flex;
				align-items: center;
				width: 100%;

				view {
					display: flex;
					align-items: center;
				}
			}
		}

		.check_img {
			width: 35px;
			height: 35px;
			margin: 0 10px;
			border-radius: 50%;
			overflow: hidden;
		}

		.bill_footer {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			background: #fff;
			box-shadow: 0 0 10px #aaa;
			box-sizing: border-box;
			// #ifdef MP-WEIXIN 
			padding: 10px 20px calc(0px + env(safe - area - inset - bottom));
			// #endif 
			// #ifndef MP-WEIXIN 
			padding: 10px 20px;
			// #endif 

			.bill_submit {
				background: #55c9c9;
				color: #fff;
				height: 50px;
				text-align: center;
				border-radius: 5px;
				line-height: 50px;
				font-size: 20px;
				font-weight: bold;
			}
		}
	}
</style>