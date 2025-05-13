require("dotenv").config();
const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const crypto = require('crypto');
const router = express.Router()

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // 检查是否存在该用户
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: '用户不存在' });
        }
        // 从存储的密码中提取盐值
        const [hashedPassword, salt] = user.password.split('.');
        // 使用盐值对输入的密码进行哈希
        const hashInputPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
        // 比较输入密码的哈希值和存储的哈希密码
        if (hashInputPassword !== hashedPassword) {
            return res.status(401).json({ error: '密码错误' });
        }
        // 生成 JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 * 7 } // Token 有效期为7天
        );
        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            personSignature: user.personSignature,
            uid: user.uid
        }
        // 响应并返回token
        res.status(200).json({ message: '登录成功', token, code: 200, userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '服务器错误' });
    }
});

module.exports = router