<template>
	<view class="find">
		<view class="u-tabs-box">
			<up-tabs activeColor="#55c9c9" ref="tabs" :list="list" :current="current" @change="tabChange"
				:is-scroll="false" swiperWidth="750"></up-tabs>
		</view>
		<view class="comment" v-for="(res, index) in commentList" :key="res.id">
			<view class="left">
				<image :src="res.url" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.name }}</view>
					<view class="like" :class="{ highlight: res.isLike }">
						<view class="num">{{ res.likeNum }}</view>
						<up-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a"
							@click="getLike(index)"></up-icon>
						<up-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></up-icon>
					</view>
				</view>
				<view class="content">{{ res.contentText }}</view>
				<view class="reply-box">
					<view class="item" v-for="(item, index) in res.replyList" :key="index">
						<view class="username">{{ item.name }}</view>
						<view class="text">{{ item.contentStr }}</view>
					</view>
					<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
						共{{ res.allReply }}条回复
						<up-icon class="more" name="arrow-right" :size="26"></up-icon>
					</view>
				</view>
				<view class="bottom">
					{{ res.date }}
					<view class="reply">回复</view>
				</view>
			</view>
		</view>
		<CustomTabbar :selected="3"></CustomTabbar>
	</view>
</template>

<script>
	import CustomTabbar from "@/pages/component/custom-tabbar.vue";
	export default {
		components: {
			CustomTabbar,
		},
		data() {
			return {
				commentList: [],
				current: 0,
				list: [{
						name: '全部',
						count: 12
					},
					{
						name: '攒钱心德',
						count: 12
					},
					{
						name: '家庭',
						count: 12
					},
					{
						name: '朋友',
						count: 12
					},
					{
						name: '我的关注',
						count: 12
					}
				],
			};
		},
		onLoad() {
			this.getComment();
		},
		onShow: function() {
			if (!uni.getStorageSync('token')) {
				uni.switchTab({
					url: `/pages/my/index`
				});
				return
			}
		},
		methods: {
			// 跳转到全部回复
			toAllReply() {
				uni.navigateTo({
					url: '/pages/find/reply'
				});
			},
			// 点赞
			getLike(index) {
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if (this.commentList[index].isLike == true) {
					this.commentList[index].likeNum++;
				} else {
					this.commentList[index].likeNum--;
				}
			},
			tabChange(val) {
				console.log(val);
			},
			// 评论列表
			getComment() {
				this.commentList = [{
						id: 1,
						name: '馨香香',
						date: '12-25 18:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'http://snrqtn2an.hd-bkt.clouddn.com/account/user10.png',
						allReply: 12,
						likeNum: 33,
						isLike: false,
						replyList: [{
								name: 'uview',
								contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
							},
							{
								name: '粘粘',
								contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
							}
						]
					},
					{
						id: 2,
						name: '杨汶宗',
						date: '01-25 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 11,
						isLike: false,
						url: 'http://snrqtn2an.hd-bkt.clouddn.com/account/user2.png',
					},
					{
						id: 3,
						name: '杨宗易',
						date: '03-25 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						allReply: 0,
						likeNum: 21,
						isLike: false,
						allReply: 2,
						url: 'http://snrqtn2an.hd-bkt.clouddn.com/account/user1.png',
						replyList: [{
								name: '龙省江',
								contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
							},
							{
								name: '豆包',
								contentStr: '想吃冰糖葫芦粘豆包，但没钱5555.........'
							}
						]
					},
					{
						id: 4,
						name: '阿瑞克',
						date: '06-20 13:58',
						contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
						url: 'http://snrqtn2an.hd-bkt.clouddn.com/account/user9.png',
						allReply: 0,
						likeNum: 150,
						isLike: false
					}
				];
			}
		}
	};
</script>

<style lang="scss" scoped>
	.find {
		padding-bottom: 100px;
	}

	.comment {
		display: flex;
		padding: 30rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #55c9c9;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #55c9c9;

					.num {
						color: #55c9c9;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #55c9c9;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #55c9c9;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>