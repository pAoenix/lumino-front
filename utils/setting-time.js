// 时间格式转换Y-M-D
export const formatTime = (time) => {
	var date = new Date(time);
	var year = date.getFullYear();
	var month =
		date.getMonth() + 1 < 10 ?
		"0" + (date.getMonth() + 1) :
		date.getMonth() + 1;
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	// 拼接
	return `${year}-${month}-${day}`;
};
// 时间格式转换Y-M-D h:m:s 加时分秒
export const formatTimes = (time, type) => {
	var date = new Date(time);
	var year = date.getFullYear();
	var month =
		date.getMonth() + 1 < 10 ?
		"0" + (date.getMonth() + 1) :
		date.getMonth() + 1;
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes =
		date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds =
		date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	// 拼接
	if (type) {
		if (type == "start") {
			return `${year}-${month}-${day} 00:00:00`;
		} else if (type == "end") {
			return `${year}-${month}-${day} 23:59:59`;
		}
	} else {
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}
};

// 转换格式示例：2024-08-02T15:04:05Z
export const formatDate = (date) => {
	let time = new Date(date);
	// 获取年份、月份、日期、小时、分钟和秒数
	const year = time.getUTCFullYear();
	const month = String(time.getUTCMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以需要+1
	const day = String(time.getUTCDate()).padStart(2, "0");
	const hours = String(time.getUTCHours()).padStart(2, "0");
	const minutes = String(time.getUTCMinutes()).padStart(2, "0");
	const seconds = String(time.getUTCSeconds()).padStart(2, "0");

	// 拼接成 ISO 8601 格式，并加上 'Z' 表示 UTC 时间
	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};
// 转换格式示例：2006-01-02T15:04:05+08:00
export const formatDate1 = (date) => {
	let time = new Date(date);
	// 获取年份、月份、日期、小时、分钟和秒数
	const year = time.getFullYear();
	const month = String(time.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以需要+1
	const day = String(time.getDate()).padStart(2, "0");
	const hours = String(time.getHours()).padStart(2, "0");
	const minutes = String(time.getMinutes()).padStart(2, "0");
	const seconds = String(time.getSeconds()).padStart(2, "0");

	// 获取时区偏移（分钟）
	const timezoneOffset = -time.getTimezoneOffset();
	const offsetSign = timezoneOffset >= 0 ? "+" : "-"; // 正负号
	const offsetHours = String(
		Math.floor(Math.abs(timezoneOffset) / 60)
	).padStart(2, "0"); // 偏移小时
	const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, "0"); // 偏移分钟

	// 拼接成 ISO 8601 格式，包含时区偏移
	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
};