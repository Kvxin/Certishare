const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadToQiniu = require("../utils/qiniu")

// 设置存储配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const deleteLocalFile = (file) => {
    fs.unlink(file.path, err => {
        if (err) {
            if (err.code === 'ENOENT') {
                return;
            } else {
                console.log("上传至七牛云出现错误", err);
            }
        }
    });

}

// 单文件上传接口
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // 文件上传成功
    res.send({
        message: 'File uploaded successfully.',
        filename: req.file.filename,
    });
});



// 多文件上传接口
router.post('/uploads', upload.array('files', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('没有上传图片文件');
    }
    Promise.all(req.files.map(file => uploadToQiniu(file.path, 'certishare'))).then(urls => {
        res.send({
            code: 200,
            message: `${req.files.length} 图片上传成功`,
            fileNames: urls,
        });
        //删除本地文件
        req.files.forEach(file => {
            deleteLocalFile(file)
        });
    }).catch(err => {
        console.error(err);
        res.status(500).send('Failed to upload files.');
    });
});

module.exports = router;
