"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_uniUpgradeCenterApp_utils_callCheckVersion = require("./call-check-version.js");
const PACKAGE_INFO_KEY = "__package_info__";
function checkUpdate() {
  return new Promise((resolve, reject) => {
    uni_modules_uniUpgradeCenterApp_utils_callCheckVersion.callCheckVersion().then(async (uniUpgradeCenterResult) => {
      const code = uniUpgradeCenterResult.code;
      const message = uniUpgradeCenterResult.message;
      const url = uniUpgradeCenterResult.url;
      if (code > 0) {
        const tcbRes = await common_vendor.Ws.getTempFileURL({ fileList: [url] });
        if (typeof tcbRes.fileList[0].tempFileURL !== "undefined")
          uniUpgradeCenterResult.url = tcbRes.fileList[0].tempFileURL;
        if (uniUpgradeCenterResult.is_silently) {
          common_vendor.index.downloadFile({
            url,
            success: (res) => {
              if (res.statusCode == 200) {
                plus.runtime.install(res.tempFilePath, {
                  force: false
                });
              }
            }
          });
          return;
        }
        common_vendor.index.setStorageSync(PACKAGE_INFO_KEY, uniUpgradeCenterResult);
        common_vendor.index.navigateTo({
          url: `/uni_modules/uni-upgrade-center-app/pages/upgrade-popup?local_storage_key=${PACKAGE_INFO_KEY}`,
          fail: (err) => {
            console.error("更新弹框跳转失败", err);
            common_vendor.index.removeStorageSync(PACKAGE_INFO_KEY);
          }
        });
        return resolve(uniUpgradeCenterResult);
      } else if (code < 0) {
        console.error(message);
        return reject(uniUpgradeCenterResult);
      }
      return resolve(uniUpgradeCenterResult);
    }).catch((err) => {
      reject(err);
    });
  });
}
exports.checkUpdate = checkUpdate;
