const qiniu = require('qiniu');
const path = require('path');
require("dotenv").config();

// 从环境变量中获取七牛云配置
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;
const bucket = process.env.BUCKET;

// 封装的上传函数
function uploadToQiniu(filePath, fileFloder) {
    console.log(filePath, fileFloder);
    // 每次调用时创建新的 Mac 对象和 token
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
        scope: bucket,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);

    // 配置信息
    const config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_cn_east_2;

    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    // 生成文件的 key
    const key = `${fileFloder}/` + new Date().getTime() + path.basename(filePath);

    return new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, key, filePath, putExtra, (err, body, info) => {
            if (err) {
                reject(err);
            } else if (info.statusCode == 200) {
                const fileUrl = `https://picturebed.kvxin.top/${body.key}`;
                resolve(fileUrl);
            } else {
                console.log(body);
                reject(new Error('Failed to upload file to Qiniu.'));
            }
        });
    });
}

module.exports = uploadToQiniu;
