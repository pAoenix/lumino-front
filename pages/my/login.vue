<template>
	<view class="login">
		<up-cell-group>
			<up-cell title="手机号">
				<template #value>
					<up-input placeholder="请输入内容" clearable border="surround" v-model="phone_number"></up-input>
				</template>
			</up-cell>
			<up-cell title="用户名" v-if="is_active">
				<template #value>
					<up-input placeholder="请输入内容" clearable border="surround" v-model="name"></up-input>
				</template>
			</up-cell>

			<up-cell title="用户头像" v-if="is_active">
				<template #value>
					<up-upload :fileList="icon_file" @afterRead="afterRead" @delete="deletePic" name="用户头像" multiple
						:maxCount="1" :previewFullImage="true"></up-upload>
				</template>
			</up-cell>
		</up-cell-group>
		<view class="bill_footer">
			<view class="bill_submit" @click="is_active = false" v-if="is_active && !is_type">
				返回登录
			</view>
			<view class="bill_submit" @click="submit()">
				{{ is_type ? "修改" : is_active ? "注册" : "登录" }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_active: false,
				name: "",
				phone_number: "",
				icon_file: [],
				is_type: false,
			};
		},

		onShow: function() {
			console.log(uni.getStorageSync("userInfo"));
			if (uni.getStorageSync("userInfo")) {
				let userInfo = JSON.parse(uni.getStorageSync("userInfo"));
				this.is_type = true;
				this.is_active = true;
				this.name = userInfo.name;
				this.phone_number = userInfo.phone_number;
				this.icon_file = [{
					name: `${userInfo.name}-用户头像`,
					size: 79797,
					thumb: userInfo.icon_url,
					type: "image",
					url: userInfo.icon_url,
				}, ];
			}
		},
		onLoad() {},
		mounted() {},
		methods: {
			async afterRead(event) {
				const file = event.file;
				this.icon_file = [{
					...file[0], // 如果后续你还要上传
					name: this.name ? `${this.name}-用户头像` : file.name,
					type: "image",
				}, ];
			},
			deletePic(event) {
				this.icon_file = [];
			},
			getUserData(id) {
				const app = getApp();
				return new Promise((resolve, reject) => {
					uni.request({
						url: `${this.$baseURL}/api/v1/user?id=${id}`,
						method: "GET",
						success: (res) => {
							resolve(res.data); // 或你需要的字段
						},
						fail: (err) => {
							reject(err);
						},
					});
				});
			},
			submit() {
				if (this.is_type) {
					uni.showToast({
						title: "暂未开通修改",
						icon: "none",
					});
					uni.switchTab({
						url: `/pages/my/index`,
					});
					return;
				}
				if (!this.is_active) {
					if (!this.phone_number) {
						uni.showToast({
							title: "请填写手机号",
							icon: "none",
						});
						return;
					}
					uni.request({
						url: `${this.$baseURL}/api/v1/user?phone_number=${this.phone_number}`,
						method: "GET",
						success: (res) => {
							if (res.data?.message && res.data?.message == '用户不存在') {
								uni.showToast({
									title: "用户不存在，请完成注册",
									icon: "none",
								});
								this.is_active = true;
							} else if (res.data?.message && res.data?.message != '用户不存在') {
								uni.showToast({
									title: '请输入正确手机格式',
									icon: "none",
								});
							} else {
								uni.setStorageSync("token", this.phone_number);
								uni.setStorageSync("userInfo", JSON.stringify(res.data));
								uni.setStorageSync("userName", res.data.name);
								uni.setStorageSync("phone_number", this.phone_number);
								if (res.data?.friend?.length) {
									// 使用 map 生成所有请求 Promise
									const promiseList = res.data.friend.map((id) =>
										this.getUserData(id)
									);
									// 使用 Promise.all 等待所有请求完成
									Promise.all(promiseList)
										.then((results) => {
											console.log("所有用户数据：", results);
											getApp().globalData.userList = results;
											uni.switchTab({
												url: `/pages/my/index`,
											});
										})
										.catch((err) => {
											getApp().globalData.userList = [];
											console.error("有请求失败了", err);
										});
								} else {
									uni.switchTab({
										url: `/pages/my/index`,
									});
								}
							}
						},
						fail: (err) => {
							uni.showToast({
								title: JSON.stringify(err),
								icon: "none",
							});
						},
					});
				} else {
					console.log(this.phone_number, this.name, this.icon_file);
					if (!this.phone_number || !this.name || !this.icon_file.length) {
						uni.showToast({
							title: "请完整填写用户信息和上传头像",
							icon: "none",
						});
						return;
					}
					uni.uploadFile({
						url: `${this.$baseURL}/api/v1/user`,
						filePath: this.icon_file[0]?.tempFilePath || this.icon_file[0]?.url, // 小程序中是 tempFilePath
						name: "icon_file", // 接口接收 file 的字段名
						formData: {
							phone_number: this.phone_number,
							name: this.name,
						},
						success: (res) => {
							if (res.data?.message) {
								uni.showToast({
									title: res.data.message,
									icon: "none",
								});
							} else {
								let newData = JSON.parse(res.data);
								uni.request({
									url: `${this.$baseURL}/api/v1/user?id=${newData.id}`,
									method: "GET",
									success: (rea) => {
										if (rea.data?.message && rea.data?.message == '用户不存在') {
											uni.showToast({
												title: "用户不存在，请完成注册",
												icon: "none",
											});
											this.is_active = true;
										} else if (rea.data?.message && rea.data?.message !=
											'用户不存在') {
											uni.showToast({
												title: '请输入正确手机格式',
												icon: "none",
											});
										} else {
											uni.setStorageSync("token", this.phone_number);
											uni.setStorageSync("userInfo", JSON.stringify(rea.data));
											uni.setStorageSync("userName", this.name);
											uni.setStorageSync("phone_number", this.phone_number);
											uni.switchTab({
												url: `/pages/my/index`,
											});
										}
									},
									fail: (err) => {
										uni.showToast({
											title: JSON.stringify(err),
											icon: "none",
										});
									},
								});

							}
						},
						fail: (err) => {
							uni.showToast({
								title: JSON.stringify(err),
								icon: "none",
							});
						},
					});
				}
			},
		},
	};
</script>

<style lang="scss">
	.login {
		padding-bottom: env(safe - area - inset - bottom);
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
		display: flex;
		gap: 10px;

		.bill_dele {
			background: #e72221;
			color: #fff;
			width: 100%;
			height: 50px;
			text-align: center;
			border-radius: 5px;
			line-height: 50px;
			font-size: 20px;
			font-weight: bold;
		}

		.bill_submit {
			width: 100%;
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