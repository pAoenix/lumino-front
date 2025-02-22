<template>
	<view class="add-bill">
		<view class="bill_details" v-if="billData">
			<view class="bill_type">
				{{ ['支出','收入','转账','预交款'][billData.type] }}
			</view>
			<view class="bill_warpper">
				<view class="bill_amount">
					¥ {{ Number(billData.amount).toFixed(2) }}
				</view>
				<view class="bill_date">
					今天
				</view>
			</view>
		</view>
		<view class="bill_details">
			<view class="bill_warpper" @click="show = true">
				<text class="bill_label">支出账户</text>
				<text class="bill_text">{{ selectAccountName }}</text>
			</view>
			<up-picker :closeOnClickOverlay="true" :show="show" :columns="accountTypeOptions" @confirm="confirmAcconut"
				@cancel="close" @close="close" keyName="label"></up-picker>
		</view>
		<view class="bill_details">
			<view class="bill_warpper" @click="selectParticipants">
				<text class="bill_label">参与人</text>
				<view class="bill_text">
					共 {{ accountUserUrls.length }} 人<up-avatar-group class="account_book_user" :urls="accountUserUrls"
						size="35" gap="0.4"></up-avatar-group>
				</view>
			</view>
		</view>
		<view class="icon_warpper">
			<view class="icon_for" @click="iconSecelt(item)" :class="{ isActive: iconActive == item.icon }"
				v-for="(item, index) in iconData" :key="index">
				<SvgIcon class="icon_svg" width="50px" height="50px"
					:name="iconActive == item.icon?`${item.icon}-hover`:item.icon" />
				<text class="icon_text">{{ item.text }}</text>
			</view>
		</view>
		<view class="bill_footer">
			<view class="bill_submit" @click="submit()">
				确认
			</view>
		</view>
	</view>
</template>

<script>
	import SvgIcon from '../component/svg-icon.vue' // 引入svg
	export default {
		data() {
			return {
				billData: null,
				billUpdateData: null,
				iconData: [],
				iconActive: '',
				textActive: '',
				show: false,
				accountBookOptions: [],
				selectAccountId: '1',
				selectAccountName: '现金',
				accountTypeOptions: [],
				accountUser: [],
				accountUserUrls: [],
			}
		},
		components: {
			SvgIcon,
		},
		onShow: function() {
			// 图标数据
			const IconData = getApp().globalData.iconArray;
			this.iconData = IconData
			// 页面传递数据
			const data = getApp().globalData.billCount;
			console.log(data, '----billCount');
			if (data.icon) {
				this.iconActive = data.icon
			}
			if (data.text) {
				this.textActive = data.text
			}
			if (data.accountId) {
				this.selectAccountId = data.accountId
			}
			if (data.accountName) {
				this.selectAccountName = data.accountName
			}
			this.billData = data
			// 账本信息
			const accounts = getApp().globalData.accountBookList;
			// 账户信息
			const accountType = getApp().globalData.accountType;
			console.log(accountType);
			this.accountTypeOptions = [accountType]
			if (!data.accountId) {
				this.selectAccountId = accountType[0].id
				this.selectAccountName = accountType[0].label
			}
			// 人员信息
			const users = getApp().globalData.userList;
			this.accountUser = [data.accountBookUser[0]]
			this.accountUserUrls = [data.accountBookUserUrls[0]]
			// 编辑数据
			const updata = getApp().globalData.updateAcconutData;
			if (updata) {
				this.iconActive = updata.icon
				this.textActive = updata.text
				this.selectAccountId = updata.accountId
				this.selectAccountName = updata.accountName
				this.billData = updata
			}
			console.log(updata, '----updateAcconutData');
			this.billUpdateData = updata
			// 选择的参与人
			const selectUserList = getApp().globalData.selectUserList;
			console.log(selectUserList);
			if (selectUserList) {
				this.accountUser = selectUserList.accountUser
				this.accountUserUrls = selectUserList.accountUserUrls
			}
		},
		methods: {
			iconSecelt(item) {
				const data = getApp().globalData.billCount;
				const updata = getApp().globalData.updateAcconutData;
				getApp().globalData.billCount = {
					...data,
					icon: item.icon,
					text: item.text,
				};
				this.iconActive = item.icon;
				this.textActive = item.text;
				if (!updata) return;
				getApp().globalData.updateAcconutData = {
					...updata,
					icon: item.icon,
					text: item.text,
				};
			},
			confirmAcconut(item) {
				const data = getApp().globalData.billCount;
				const updata = getApp().globalData.updateAcconutData;
				getApp().globalData.billCount = {
					...data,
					accountId: item.value[0].id,
					accountName: item.value[0].label,
				}
				this.selectAccountId = item.value[0].id;
				this.selectAccountName = item.value[0].label;
				this.show = false
				if (!updata) return
				getApp().globalData.updateAcconutData = {
					...updata,
					accountId: item.value[0].id,
					accountName: item.value[0].label,
				}
			},
			close() {
				this.show = false
			},
			selectParticipants() {
				getApp().globalData.participantsData = {
					...this.billData,
					accountUser: this.accountUser
				};
				uni.navigateTo({
					url: `/pages/account/participants`
				});
			},
			submit() {
				// 在源页面存储数据
				getApp().globalData.selectBillData = {
					...this.billData,
					accountId: this.selectAccountId,
					accountName: this.selectAccountName,
					icon: this.iconActive,
					text: this.textActive,
					accountUser: this.accountUser,
					update: this.billUpdateData ? 1 : 0
				};
				// 清除数据，避免下次读取错误
				getApp().globalData.billCount = null;
				getApp().globalData.updateAcconutData = null;
				uni.switchTab({
					url: `/pages/index/index`
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.add-bill {
		width: 100%;
		position: relative;

		.bill_details {
			padding: 20px;
			box-sizing: border-box;
			border-bottom: 5px solid #eee;

			.bill_type {
				font-size: 16px;
				color: #999;
			}

			.bill_warpper {
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				margin-top: 10px;

				.bill_amount {
					color: #55c9c9;
					font-size: 30px;
					font-weight: bold;
				}

				.bill_label {
					color: #999;
				}

				.bill_text {
					display: flex;
					align-items: center;
					gap: 5px;
					color: #333;
				}
			}
		}

		.icon_warpper {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
			grid-gap: 23px 45px;
			justify-items: center;
			// #ifdef MP-WEIXIN 
			padding: 20px 20px calc(80px + env(safe - area - inset - bottom));
			// #endif 
			// #ifndef MP-WEIXIN 
			padding: 20px 20px 80px;
			// #endif 
			box-sizing: border-box;

			.icon_for {
				width: 50px;
				display: grid;

				&:deep(.svg-icon) {
					background: #eee;
					padding: 10px;
					border-radius: 50%;
					box-sizing: border-box;
				}

				.icon_text {
					display: block;
					width: 100%;
					margin-top: 5px;
					font-size: 14px;
					color: #333;
					text-align: center;
					height: 18px;
					line-height: 18px;
				}
			}

			.isActive {
				&:deep(.svg-icon) {
					background: #55c9c9;
				}

				.icon_text {
					color: #55c9c9;
				}
			}
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