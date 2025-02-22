<template>
	<view>
		<up-cell-group>
			<up-cell title="账本名称">
				<template #value>
					<up-input placeholder="请输入内容" clearable border="surround" v-model="accountBookName"></up-input>
				</template>
			</up-cell>
			<view class="checkbox_user">
				<up-checkbox-group v-model="activeUser" placement="column" @change="checkboxChange">
					<up-checkbox class="participants-checkbox-group" v-for="(item,index) in userList" shape="circle"
						:key="index" activeColor="#55c9c9" :label="item.name" :name="item.id">
						<template #label> <img class="check_img" :src="item.img" alt="" /> {{item.name}}</template>
					</up-checkbox>
				</up-checkbox-group>
			</view>
		</up-cell-group>
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
				accountBookName: '',
				userList: '',
				activeUser: [],
				updateData: null
			};
		},

		onShow: function() {
			const users = getApp().globalData.userList;
			this.userList = users
			const updateData = getApp().globalData.updateAccountBook;
			console.log(updateData);
			this.updateData = updateData
			if (updateData) {
				this.accountBookName = updateData.title
				this.activeUser = updateData.users
			}
			getApp().globalData.updateAccountBook = null
		},
		methods: {
			checkboxChange(data) {
				console.log(data);
			},
			submit() {
				const accounts = getApp().globalData.accountBookList;
				let newData = {
					id: this.updateData ? this.updateData.id : new Date().getTime(),
					title: this.accountBookName,
					createAt: this.updateData ? this.updateData.createAt : new Date().getTime(),
					incomeAmount: this.updateData ? this.updateData.incomeAmount : 0.00,
					expensesAmount: this.updateData ? this.updateData.expensesAmount : 0.00,
					users: this.activeUser
				}
				if (this.updateData) {
					let index = accounts.findIndex(item => item.id == this.updateData.id)
					let newAccounts = JSON.parse(JSON.stringify(accounts))
					if (index !== -1) {
						newAccounts[index] = newData
					}
					getApp().globalData.accountBookList = newAccounts
				} else {
					let newAccounts = accounts.concat([newData])
					getApp().globalData.accountBookList = newAccounts
				}
				uni.switchTab({
					url: `/pages/details/index`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
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

	.checkbox_user {
		// #ifdef MP-WEIXIN
		padding: 10px 20px calc(80px + env(safe - area - inset - bottom));
		// #endif 
		// #ifndef MP-WEIXIN 
		padding: 10px 20px 80px;
		// #endif 
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
</style>