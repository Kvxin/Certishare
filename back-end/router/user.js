const express = require("express")
const router = express.Router()
const User = require("../models/User");
const Card = require("../models/Card")



router.patch('/updateUser', async (req, res) => {
    try {
        const uid = req.body.uid;
        const updatedUserInfo = req.body.updateInfo;
        const updatedUser = await User.findOneAndUpdate({ uid }, updatedUserInfo, { new: true }).select('-password -__v -answerLocalhost -getAnswerLocalHost');
        if (!updatedUser) {
            res.status(404).json({ message: '用户不存在' });
        }
        res.status(200).json({ message: '用户信息已成功更新', updatedUser });
    } catch (error) {
        res.status(500).json({ message: '更新用户信息失败' });
        console.error('更新用户信息失败:', error);
    }
})


router.post('/getUser', async (req, res) => {
    const userId = req.body.id;
    const userCardList = await Card.find({ author: userId });
    const user = await User.findById(userId).select('-password');

    if (!user) {
        return res.status(404).json({ message: '找不到用户' }); // This means "User not found"
    }
    const users = JSON.parse(JSON.stringify(user))
    users.cardLength = userCardList.length;

    res.json(users)
});


router.post('/getUserCardList', async (req, res) => {
    try {
        const id = req.body.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: '找不到用户' });
        }
        const userCardList = await Card.find({ author: id });
        const formattedCardList = userCardList.map((card) => ({
            _id: card._id,
            title: card.title,
            content: card.content,
            images: card.images,
            like: card.like,
            tags: card.tags,
            author: {
                _id: user._id,
                username: user.username,
                avatar: user.avatar
            },
        }));
        res.json(formattedCardList)
    } catch (error) {
        res.status(500).json({ message: "服务器错误" })
    }
})

module.exports = router;