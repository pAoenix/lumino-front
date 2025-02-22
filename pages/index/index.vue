<template>
	<view class="container">
		<view class="account_warpper">
			<view class="container_header">
				<!-- <text>默认账本</text> -->
				<up-dropdown class="account_book" border-radius="8">
					<up-dropdown-item v-model="accountBookId" :title="accountBookName" @change="accountChange"
						:options="accountBookList">
					</up-dropdown-item>
				</up-dropdown>
				<up-avatar-group class="account_book_user" :urls="accountBookUserUrls" size="35"
					gap="0.4"></up-avatar-group>
			</view>
			<swiper class="swiper_warpper" :autoplay="true" :interval="3000">
				<swiper-item class="swiper_warpper_item" v-for="(item, index) in account_warpper" :key="index">
					<!-- 这里自定义 view 内容 -->
					<view class="left-content">
						<text class="count">{{ item.amount }}</text>
						<text class="type">{{ item.type }}</text>
					</view>
					<view class="right-content">
						<text class="counts">{{ item.amounts }}</text>
						<text class="text">我的结余（¥）</text>
					</view>
					<view class="title">{{ item.title }}</view>
				</swiper-item>
			</swiper>
			<view class="account_title">
				<span>今日</span>
				<view class="title_total">
					<span>支出：¥999.33</span>
					<span>收入：¥999.33</span>
				</view>
			</view>
			<up-swipe-action class="account_table">
				<up-swipe-action-item @click="(props) => conutClick(props,item,index)" :options="options"
					v-for="(item, index) in accountList" :key="index">
					<view class="account_for">
						<!-- <img class="for_img" src="/static/pay.png" alt="" /> -->
						<SvgIcon width="40px" height="40px" :name="`${item.icon}-hover`" />
						<view class="for_warpper">
							<view class="type">{{ ['支出','收入','转账','预交款'][item.type] }}：<text>{{ item.text }}</text>
							</view>
							<text>杨宗易{{ ['支出','收入','转账','预交款'][item.type] }}</text>
						</view>
						<view class="amount">
							¥{{ Number(item.amount).toFixed(2) }}
						</view>
					</view>
				</up-swipe-action-item>
			</up-swipe-action>

		</view>
		<!-- <view class="bottom_icon">
			<img class="icon_img" src="/static/addHL.png" alt="" />
		</view> -->
		<CustomTabbar :selected="2" @change="tabberChange"></CustomTabbar>
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
		data() {
			return {
				show: false,
				accountBookId: '',
				accountBookName: '',
				accountBook: null,
				accountBookList: [],
				accountBookUser: [],
				accountBookUserUrls: [],
				userList: [],
				accountList: [{
					id: 1,
					type: '0',
					amount: 399.00,
					text: '零食',
					icon: 'icon-lingshi-fill',
					accountBook: {
						createAt: "2025-01-20 15:26:56",
						expensesAmount: 99.99,
						id: 1,
						incomeAmount: 5899.99,
						title: "默认账本",
						users: [1, 2, 3, 4, 5, 8]
					},
					accountBookId: 1,
					accountBookName: "默认账本",
					accountBookUser: [1, 2, 3, 4, 5, 8],
					accountBookUserUrls: [
						"/static/user/user1.png",
						"/static/user/user2.png",
						"/static/user/user3.png",
						"/static/user/user4.png",
						"/static/user/user5.png",
						"/static/user/user8.png",
					],
					accountUser: [1, 2, 4, 5, 8],
					accountId: 3,
					accountName: "现金",
				}, {
					id: 2,
					type: '0',
					amount: 600.33,
					text: '宠物',
					icon: 'icon-chongwu-fill',
					accountBook: {
						createAt: "2025-01-20 15:26:56",
						expensesAmount: 99.99,
						id: 1,
						incomeAmount: 5899.99,
						title: "默认账本",
						users: [1, 2, 3, 4, 5, 8]
					},
					accountBookId: 1,
					accountBookName: "默认账本",
					accountBookUser: [1, 2, 3, 4, 5, 8],
					accountBookUserUrls: [
						"/static/user/user1.png",
						"/static/user/user2.png",
						"/static/user/user3.png",
						"/static/user/user4.png",
						"/static/user/user5.png",
						"/static/user/user8.png",
					],
					accountUser: [2, 5, 8],
					accountId: 3,
					accountName: "现金",
				}, {
					id: 3,
					type: '1',
					amount: 999.33,
					text: '机票',
					icon: 'icon-jipiao-fill',
					accountBook: {
						createAt: "2025-01-20 15:26:56",
						expensesAmount: 99.99,
						id: 1,
						incomeAmount: 5899.99,
						title: "默认账本",
						users: [1, 2, 3, 4, 5, 8]
					},
					accountBookId: 1,
					accountBookName: "默认账本",
					accountBookUser: [1, 2, 3, 4, 5, 8],
					accountBookUserUrls: [
						"/static/user/user1.png",
						"/static/user/user2.png",
						"/static/user/user3.png",
						"/static/user/user4.png",
						"/static/user/user5.png",
						"/static/user/user8.png",
					],
					accountUser: [3, 4, 8],
					accountId: 3,
					accountName: "现金",
				}],
				options: [{
						text: '编辑',
						style: {
							backgroundColor: '#3c9cff',
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#f56c6c',
						}
					}
				],
				account_warpper: [{
						amount: 8888.88,
						amounts: 22.22,
						type: '账单支出（¥）',
						title: '今天杨宗易支出 ¥:33345.00 元',
					},
					{
						amount: 8888.88,
						amounts: 22.22,
						type: '账单收入（¥）',
						title: '今日杨宗易收入 ¥:33552.00 元',
					},
					{
						amount: 8888.88,
						amounts: 22.22,
						type: '账单转账（¥）',
						title: '今日杨宗易转账 ¥:33552.00 元',
					},
					{
						amount: 8888.88,
						amounts: 22.22,
						type: '账单预交款（¥）',
						title: '今日杨宗易预交款¥:33552.00 元',
					}
				],
			}
		},
		computed: {

		},
		onShow: function() {
			const accounts = getApp().globalData.accountBookList;
			const activeAccounts = getApp().globalData.activeAccountBookList;
			const users = getApp().globalData.userList;
			this.userList = users
			this.accountBookList = accounts.map(item => {
				return {
					...item,
					label: item.title,
					value: item.id
				}
			})
			if (activeAccounts) {
				this.accountBook = activeAccounts
				this.accountBookId = activeAccounts.id
				this.accountBookName = activeAccounts.title
				this.accountBookUser = activeAccounts.users
				this.accountBookUserUrls = activeAccounts.users.map(item => users.find(items => items.id == item).img)
			} else {
				this.accountBook = accounts[0]
				this.accountBookId = accounts[0].id
				this.accountBookName = accounts[0].title
				this.accountBookUser = accounts[0].users
				this.accountBookUserUrls = accounts[0].users.map(item => users.find(items => items.id == item).img)
			}

			// 新增账单获取数据
			const data = getApp().globalData.selectBillData;
			if (data) {
				if (data.update) {
					let index = this.accountList.findIndex(item => item.id == data.id)
					this.accountList[index] = data
				} else {
					this.accountList.unshift({
						...data,
						id: new Date().getTime()
					})
				}
			}
			// 清除数据，避免下次读取错误
			getApp().globalData.selectBillData = null;
		},
		methods: {
			tabberChange() {
				getApp().globalData.accountBookData = {
					accountBook: this.accountBook,
					accountBookId: this.accountBookId,
					accountBookName: this.accountBookName,
					accountBookUser: this.accountBookUser,
					accountBookUserUrls: this.accountBookUserUrls,
				};
				uni.navigateTo({
					url: "/pages/account/add-count"
				});
			},
			accountChange(item) {
				this.accountBookId = item
				let data = this.accountBookList.find(items => items.id == item)
				this.accountBook = data
				this.accountBookName = data.label
				this.accountBookUser = data.users
				this.accountBookUserUrls = data.users.map(tem => this.userList.find(items => items.id ==
					tem).img)
			},
			conutClick(props, item, index) {
				if (props.index == 1) {
					// 删除
					this.accountList.splice(index, 1)
				} else {
					// 在源页面存储数据
					getApp().globalData.updateAcconutData = {
						...item,
						accountBook: this.accountBook,
						accountBookId: this.accountBookId,
						accountBookName: this.accountBookName,
						accountBookUser: this.accountBookUser,
						accountBookUserUrls: this.accountBookUserUrls,
					};
					// 在源页面存储数据
					getApp().globalData.billCount = {
						...item,
						amount: item.amount,
						type: item.type,
						accountBook: this.accountBook,
						accountBookId: this.accountBookId,
						accountBookName: this.accountBookName,
						accountBookUser: this.accountBookUser,
						accountBookUserUrls: this.accountBookUserUrls,
					};
					uni.navigateTo({
						url: `/pages/account/add-bill`
					});
					// uni.navigateTo({
					// 	url: "/pages/account/account-details"
					// });
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {

		// #ifdef MP-WEIXIN
		padding-bottom: calc(60px + env(safe - area - inset - bottom));
		// #endif 
		// #ifndef MP-WEIXIN 
		padding-bottom: 60px;
		// #endif 

		.account_warpper {
			width: 100%;
			padding: 10px;
			box-sizing: border-box;

			.container_header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10px;
				position: relative;

				.account_book_user {
					position: absolute;
					top: 50%;
					right: 5px;
					transform: translateY(-50%);
				}

				.account_book {
					&:deep(.u-dropdown__menu) {
						.u-dropdown__menu__item {
							justify-content: flex-start;

							.u-flex-row {
								display: flex;
								align-items: center;

								.u-dropdown__menu__item__text {
									font-size: 20px !important;
									font-weight: bold;
								}

								.u-dropdown__menu__item__arrow {
									.uni-text {
										font-size: 20px !important;
										font-weight: bold;
									}
								}
							}
						}
					}

					&:deep(.u-dropdown__content) {
						.u-cell__title-text {
							font-size: 16px !important;
							font-weight: 500;
						}
					}
				}

				text {
					font-size: 22px;
					font-weight: bold;
				}
			}

			.swiper_warpper {
				height: 120px;
				margin-bottom: 10px;

				.swiper_warpper_item {
					padding: 0 20px 20px;
					display: flex;
					align-items: center;
					box-sizing: border-box;
					justify-content: space-between;
					background: linear-gradient(45deg, #55c9c9, #24f4eb);
					border-radius: 10px;
					position: relative;

					.title {
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 30px;
						line-height: 30px;
						background-color: #00000047;
						color: #fff;
						font-size: 12px;
						text-align: center;
					}

					text {
						display: block;
						color: #fff;
					}

					.count {
						font-size: 30px;
						font-weight: bold;
					}

					.counts {
						font-size: 20px;
					}

					.type,
					.text {
						font-size: 13px;
					}
				}
			}

			.account_title {
				width: 100%;
				font-size: 13px;
				padding: 3px 10px;
				background: #f0f0f0;
				box-sizing: border-box;
				color: #333;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title_total {
					display: flex;
					gap: 10px;
				}
			}

			.account_table {
				padding: 10px;
				display: flex;
				// gap: 10px;
				flex-direction: column;

				&:deep(.u-swipe-action-item) {
					// box-shadow: 0 0 10px #f0f0f0;
					border-bottom: 1px solid #f0f0f0;
				}

				&:deep(.u-swipe-action-item__right) {
					top: 1px;
					bottom: 1px;
					right: 1px;
				}

				.account_for {
					width: 100%;
					padding: 20px 10px;
					box-sizing: border-box;
					display: flex;
					gap: 20px;
					align-items: center;

					&:deep(.svg-icon) {
						box-sizing: border-box;
						padding: 8px;
						border-radius: 50%;
						background: #eeeeee;
					}

					.for_img {
						width: 40px;
						height: 40px;
					}

					.for_warpper {
						text {
							display: block;
							font-size: 12px;
							color: #999;
						}

						.type {
							display: flex;
							align-items: center;
							font-size: 12px;
							color: #999;

							text {
								display: block;
								font-size: 16px;
								color: #333;
							}
						}
					}

					.amount {
						font-size: 20px;
						color: #1e9813;
						margin-left: auto;
					}
				}
			}
		}
	}

	.bottom_icon {
		position: fixed;
		bottom: env(safe - area - inset - bottom);
		left: 50%;
		transform: translateX(-50%);
		width: 60px;
		height: 60px;
		z-index: 9999999999;
		border-top: 1px solid #f0f0f0;
		border-bottom: none;
		border-radius: 50%;
		background: #fff;
		padding: 10px;

		.icon_img {
			width: 100%;
			height: 100%;
		}
	}
</style>