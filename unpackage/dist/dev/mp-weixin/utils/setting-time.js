"use strict";
const formatTime = (time) => {
  var date = new Date(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return `${year}-${month}-${day}`;
};
const formatTimes = (time, type) => {
  var date = new Date(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
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
const formatTimes1 = (time, type) => {
  const date = new Date(time.replace("T", " ").replace("Z", ""));
  var year = date.getFullYear();
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (type) {
    if (type == "start") {
      return `${year}-${month}-${day} 00:00:00`;
    } else if (type == "end") {
      return `${year}-${month}-${day} 23:59:59`;
    }
  } else {
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }
};
const formatDateT = (date) => {
  let time = new Date(date);
  const year = time.getUTCFullYear();
  const month = String(time.getUTCMonth() + 1).padStart(2, "0");
  const day = String(time.getUTCDate()).padStart(2, "0");
  const hours = String(time.getUTCHours()).padStart(2, "0");
  const minutes = String(time.getUTCMinutes()).padStart(2, "0");
  const seconds = String(time.getUTCSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};
const formatDateUTC = (date) => {
  let time = new Date(date);
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const day = String(time.getDate()).padStart(2, "0");
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  const timezoneOffset = -time.getTimezoneOffset();
  const offsetSign = timezoneOffset >= 0 ? "+" : "-";
  const offsetHours = String(
    Math.floor(Math.abs(timezoneOffset) / 60)
  ).padStart(2, "0");
  const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
};
function formatDateToCustomString(dateStr) {
  const date = new Date(dateStr.replace("T", " ").replace("Z", ""));
  const pad = (n) => n.toString().padStart(2, "0");
  const M = pad(date.getMonth() + 1);
  const D = pad(date.getDate());
  const h = pad(date.getHours());
  const m = pad(date.getMinutes());
  return `${M}月${D}日 ${h}:${m}`;
}
exports.formatDateT = formatDateT;
exports.formatDateToCustomString = formatDateToCustomString;
exports.formatDateUTC = formatDateUTC;
exports.formatTime = formatTime;
exports.formatTimes = formatTimes;
exports.formatTimes1 = formatTimes1;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/setting-time.js.map
