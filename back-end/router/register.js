const express = require('express');
const router = express.Router();
const User = require('../models/User')
const SMS = require('../models/SMS')
const crypto = require('crypto');
router.post('/register', async (req, res) => {
    try {
        let uid;
        const { email, password, code } = req.body.userData;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: '该用户已经被注册' });
        }
        const smsRecord = await SMS.findOne({ email, code });
        if (!smsRecord) {
            return res.status(400).json({ error: '验证码不匹配' });
        }
        await SMS.deleteOne({ _id: smsRecord._id });
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
        await setUid().then(res => {
            uid = res;
        })
        const newUser = new User({
            uid,
            username: `邮箱用户${generateRandomString()}`,
            email,
            password: `${hash}.${salt}`
        });
        await newUser.save();
        return res.status(200).json({ message: '注册成功', code: 200 });
    } catch (error) {
        console.log(error);
    }
})

const setUid = async () => {
    const user = await User.countDocuments();
    const nextUid = user + 10001;
    return nextUid.toString();
}

const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

module.exports = router;