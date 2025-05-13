const express = require('express');
const router = express.Router();
const moment = require('moment');
const User = require('../models/User')
const Card = require('../models/Card');
const Comment = require('../models/Comment')
const mongoose = require('mongoose');



router.post('/createCard', async (req, res) => {
    try {
        const { imgList, title, content, labels, authorId } = req.body.data;
        const author = await User.findById(authorId);
        const comments = [];
        if (!author) {
            return res.status(404).json({ message: '找不到作者' });
        }
        const newCard = new Card({
            title,
            content,
            images: imgList,
            author: authorId,
            labels,
            comments,
            createdAt: new Date().getTime(),
        });
        await newCard.save();
        author.posts.push(newCard);
        await author.save();
        res.status(200).json({ message: '发布成功', cardId: newCard._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: '内部服务器错误' });
    }
})


router.post('/getTypeList', async (req, res) => {
    const key = req.body.key;
    const cardList = await Card.find({ tags: key }).populate('author', 'username avatar _id personSignature');
    if (cardList.length > 0) {
        res.status(200).json({
            cardList, code: 200
        });
    } else {
        res.json({ error: "没有找到数据", code: 404 });
    }
})
router.get('/getCardList', async (req, res) => {
    try {
        const randomCards = await Card.aggregate([
            { $sample: { size: 10 } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'authorDetails'
                }
            },
            {
                $unwind: '$authorDetails'
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    images: 1,
                    like: 1,
                    tags: 1,
                    'author._id': '$authorDetails._id',
                    'author.username': '$authorDetails.username',
                    'author.avatar': '$authorDetails.avatar',
                }
            }
        ]);

        if (randomCards.length > 0) {
            res.status(200).json(randomCards);
        } else {
            res.status(404).json({ error: "没有找到数据" });
        }
    } catch (error) {
        console.error('获取卡片出错', error);
        res.status(500).json({ error: '获取卡片时出错' });
    }
});

router.post('/addToWatchedHistory', async (req, res) => {
    try {
        const { userId, cardId } = req.body;
        // const userId = req.body.userId;
        // const cardId = req.body.cardId;
        // 检查用户和卡片是否存在
        const user = await User.findById(userId);
        const card = await Card.findById(cardId);
        if (!user || !card) {
            return res.status(404).json({ message: '用户或卡片未找到' });
        }
        // 将卡片的 ObjectId 添加到用户的观看卡片历史记录中
        user.watchedCardHistory.addToSet(card._id);
        // 保存用户文档
        await user.save();
        res.json({ message: '卡片已添加到观看历史记录' })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '发生错误' });
    }
})

router.get('/getCardInfo', async (req, res) => {
    try {
        const id = req.query.id;
        const cardInfo = await Card.findById(id)
            .populate({
                path: 'author',
                select: 'username avatar'
            }).populate({
                path: 'comment',
                select: 'content createdAt like',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'commenter',
                    select: 'username avatar'
                }
            })
            .exec();
        if (cardInfo) {
            res.json(cardInfo);
        } else {
            res.status(404).json({ message: "未找到卡片信息" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "服务器错误" });
    }
});

router.post('/delCard', async (req, res) => {
    const id = req.body.id
    const card = await Card.findById(id)
    if (card) {
        await Card.deleteOne({ _id: id })
        res.status(200).json({ message: "删除成功" })
    }
    else {
        res.status(404).json({ message: "卡片不存在" })
    }
})

router.post('/setLikeCard', async (req, res) => {
    try {
        const cardId = req.body.cardId;
        const currentUserUid = req.body.userId;
        // 查找当前用户
        const currentUser = await User.findOne({ _id: currentUserUid });
        // 查找要喜欢的卡片
        const card = await Card.findById(cardId);
        // 检查卡片是否存在
        if (!card) {
            return res.status(404).json({ message: '卡片不存在', code: 404 });
        }
        // 检查用户是否已经喜欢了这个卡片
        const userLiked = currentUser.recentLikes.includes(cardId);
        if (userLiked) {
            // 用户已经喜欢了这张卡片，执行取消喜欢操作
            // 减少卡片的 like 字段减一
            card.like -= 1;
            // 从用户的喜欢列表中移除卡片的ID
            currentUser.recentLikes = currentUser.recentLikes.filter(likedCardId => likedCardId.toString() !== cardId);
            res.status(200).json({ message: '取消喜欢成功', code: 200 });
        } else {
            // 用户未喜欢这张卡片，执行喜欢操作
            // 增加卡片的 like 字段加一
            card.like += 1;
            // 更新用户的喜欢列表
            currentUser.recentLikes.push(cardId);
            res.status(200).json({ message: '喜欢成功', code: 200 });
        }
        // 保存卡片和用户数据
        await card.save();
        await currentUser.save();
    } catch (error) {
        console.error('操作卡片失败:', error);
        res.status(500).json({ message: '操作卡片失败' });
    }
});

module.exports = router
