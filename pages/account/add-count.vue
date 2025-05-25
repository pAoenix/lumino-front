<template>
	<view class="account">
		<view class="conut_warpper">
			<view class="subsection">
				<up-subsection activeColor="#55c9c9" :list="radiolist" :current="current"
					@change="sectionChange"></up-subsection>
			</view>
			<view class="countNuber">¥
				{{
          conutNumber.length ? conutNumber : Number(inputValue).toFixed(2)
        }}
			</view>
			<view class="countString" v-show="conutNumber">{{ inputValue }}</view>
		</view>
		<up-keyboard class="count_keyboard" ref="uKeyboard" :overlay="false" :safeAreaInsetBottom="true" tips="请输入账单金额"
			mode="number" :show="show" :showCancel="false" @change="keyboardChange" @backspace="keyboardBackspace"
			@confirm="submit">
			<template>
				<view class="button_warpper">
					<span class="but jia" @click="keyboardChanges('+')">+</span>
					<span class="but jian" @click="keyboardChanges('-')">-</span>
					<span class="but jian" @click="keyboardChanges('*')">*</span>
					<span class="but jian" @click="keyboardChanges('/')">/</span>
				</view>
			</template>
		</up-keyboard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				inputValue: "",
				conutNumber: "",
				current: 0,
				radiolist: [{
						name: "收入",
					},
					{
						name: "支出",
					},
					// {
					// 	name: '转账',
					// },
					// {
					// 	name: '预交款',
					// },
				],
				accountBook: null,
			};
		},
		watch: {
			inputValue: {
				handler(newVal) {
					console.log(newVal);
					if (
						newVal.indexOf("+") !== -1 ||
						newVal.indexOf("-") !== -1 ||
						newVal.indexOf("*") !== -1 ||
						newVal.indexOf("/") !== -1
					) {
						this.conutNumber = `${this.calculateExpression(newVal).toFixed(2)}`;
					} else {
						this.conutNumber = "";
					}
				},
				deep: true,
				immediate: true,
			},
		},
		onShow: function() {
			const accountBook = getApp().globalData.accountBookData;
			console.log(accountBook);
			this.accountBook = accountBook;
			// 清除数据，避免下次读取错误
			getApp().globalData.accountBookData = null;
		},
		methods: {
			sectionChange(index) {
				this.current = index;
			},
			calculateExpression(expression) {
				// 去除表达式两端的空格
				expression = expression.trim();
				// 检查输入是否为空
				if (expression === "") {
					return 0;
				}
				// 定义运算符的优先级
				const precedence = {
					"+": 1,
					"-": 1,
					"*": 2,
					"/": 2,
				};
				// 定义运算符对应的操作函数
				const operators = {
					"+": (a, b) => a + b,
					"-": (a, b) => a - b,
					"*": (a, b) => a * b,
					"/": (a, b) => a / b,
				};

				// 使用正则表达式将字符串拆分成数字和运算符数组
				let tokens = expression.match(/\d+\.\d+|\d+|\+|\-|\*|\/|\(|\)/g) || [];

				// 检查最后一个字符是否为运算符，如果是，则去掉该运算符
				if (/[\+\-\*\/]$/.test(expression)) {
					tokens = tokens.slice(0, -1);
				}
				const values = [];
				const ops = [];

				// 辅助函数：执行操作
				const applyOp = () => {
					const op = ops.pop();
					const b = values.pop();
					const a = values.pop();
					values.push(operators[op](a, b));
				};

				for (let i = 0; i < tokens.length; i++) {
					const token = tokens[i];
					if (/^\d+(\.\d+)?$/.test(token)) {
						values.push(parseFloat(token));
					} else if (token === "(") {
						ops.push(token);
					} else if (token === ")") {
						while (ops[ops.length - 1] !== "(") {
							applyOp();
						}
						ops.pop();
					} else {
						while (
							ops.length > 0 &&
							precedence[ops[ops.length - 1]] >= precedence[token]
						) {
							applyOp();
						}
						ops.push(token);
					}
				}

				while (ops.length > 0) {
					applyOp();
				}

				return values[0];
			},
			keyboardChange(val) {
				this.inputValue += val;
			},
			keyboardChanges(val) {
				if (!this.inputValue) return;
				this.inputValue += val;
			},
			submit() {
				let number = this.conutNumber.length ? this.conutNumber : this.inputValue;
				// 在源页面存储数据
				getApp().globalData.billCount = {
					...this.accountBook,
					amount: number,
					type: Number(this.current + 1),
				};
				uni.navigateTo({
					url: `/pages/account/add-bill`,
				});
			},
			keyboardBackspace(val) {
				// 删除value的最后一个字符
				if (this.inputValue.length) {
					this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
				}
			},
		},
	};
</script>

<style lang="scss">
	.account {
		.conut_warpper {
			padding: 20px;

			.subsection {
				padding: 0 20px;
			}

			.countNuber {
				padding: 30px 0 20px;
				font-size: 40px;
				color: #333;
			}

			.countString {
				font-size: 20px;
				color: #999;
			}
		}

		.count_keyboard {
			&:deep(.u-popup__content) {
				.u-keyboard__tooltip__submit {
					color: #55c9c9;
				}
			}
		}

		.button_warpper {
			display: flex;
			gap: 10px;
			padding: 10px;

			.but {
				height: 40px;
				line-height: 40px;
				display: block;
				text-align: center;
				width: 25%;
				background: #fff;
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
				border-bottom-left-radius: 4px;
				border-bottom-right-radius: 4px;
				font-size: 20px;
				font-weight: 500;
				color: #303133;

				&:active {
					background: #bbb;
				}
			}
		}
	}
</style>