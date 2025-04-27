"use strict";
const formatDate = (date) => {
  let time = new Date(date);
  const year = time.getUTCFullYear();
  const month = String(time.getUTCMonth() + 1).padStart(2, "0");
  const day = String(time.getUTCDate()).padStart(2, "0");
  const hours = String(time.getUTCHours()).padStart(2, "0");
  const minutes = String(time.getUTCMinutes()).padStart(2, "0");
  const seconds = String(time.getUTCSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};
exports.formatDate = formatDate;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/setting-time.js.map
