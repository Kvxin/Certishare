const express = require('express');
const router = express.Router();
const User = require('../models/User'); // 根据你的目录结构调整路径
const SignIn = require('../models/SignIn'); // 根据你的目录结构调整路径

// 签到接口
router.post('/signin', async (req, res) => {
    const { userId, date } = req.body.data;
    if (!userId || !date) {
        return res.status(400).send({ message: 'Missing userId or date.' });
    }

    try {
        // 查找用户是否存在
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // 尝试查找用户的签到记录
        if (!user.dates.includes(date)) {
            // 如果该日期尚未签到，添加到签到数组中
            user.dates.push(date);
            await user.save(); // 保存更新后的用户文档
            res.status(200).send({ message: 'Signed in successfully.', user });
        } else {
            // 如果用户已签到，则不做任何更改
            res.status(200).send({ message: 'Already signed in.', user });
        }
    } catch (error) {
        res.status(500).send({ message: 'Server error.', error: error.message });
    }
});

router.post('/getUserSignInData', async (req, res) => {
    const { userId } = req.body;
    const userData = await User.findOne({ userId }, 'dates')
    res.json(userData);
})

module.exports = router;
