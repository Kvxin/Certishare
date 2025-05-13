const express = require('express');
const router = express.Router();
const Card = require('../models/Card')
const User = require("../models/User")
const Post = require("../models/Post")
let lastRequestTime = Date.now();
//搜索用
router.post('/search', async (req, res) => {
    const searchText = req.body.searchText;
    try {
        const matchingCards = await Card.find({
            $or: [
                { title: { $regex: searchText, $options: 'i' } },
                { content: { $regex: searchText, $options: 'i' } }
            ]
        }).sort({ score: -1 });
        const cardDataWithAuthor = await Promise.all(matchingCards.map(async (card) => {
            // 查询与卡片关联的用户
            const user = await User.findById(card.author);
            // 创建包含卡片和作者信息的新对象
            const formattedCard = {
                _id: card._id,
                title: card.title,
                content: card.content,
                images: card.images,
                like: card.like,
                tags: card.tags,
                author: {
                    _id: user ? user._id : null,
                    username: user ? user.username : null,
                    avatar: user ? user.avatar : null
                }
            };
            return formattedCard;
        }));

        // 对卡片数据进行排序（不再需要手动排序用户数据）
        cardDataWithAuthor.sort((cardA, cardB) => {
            const scoreA = (cardA.title.match(new RegExp(searchText, 'gi')) || []).length + (cardA.content.match(new RegExp(searchText, 'gi')) || []).length;
            const scoreB = (cardB.title.match(new RegExp(searchText, 'gi')) || []).length + (cardB.content.match(new RegExp(searchText, 'gi')) || []).length;
            if (scoreA !== scoreB) {
                return scoreB - scoreA; // 按分数降序排序
            } else {
                // 标题相同时，根据内容是否有搜索文本进行排序
                if (cardA.content.includes(searchText) && !cardB.content.includes(searchText)) {
                    return -1; // cardA在前
                } else if (!cardA.content.includes(searchText) && cardB.content.includes(searchText)) {
                    return 1; // cardB在前
                } else {
                    return 0; // 保持不变
                }
            }
        });
        res.json(cardDataWithAuthor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/searchPosts', async (req, res) => {
    const searchText = req.body.searchText;
    try {
        // 搜索符合条件的帖子
        const matchingPosts = await Post.find({
            $or: [
                { title: { $regex: searchText, $options: 'i' } },
                { content: { $regex: searchText, $options: 'i' } },
                { summary: { $regex: searchText, $options: 'i' } },
                { tags: { $regex: searchText, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });

        const postDataWithAuthor = await Promise.all(matchingPosts.map(async (post) => {
            // 查询与帖子关联的用户
            const user = await User.findById(post.author);
            // 创建包含帖子和作者信息的新对象
            const formattedPost = {
                _id: post._id,
                title: post.title,
                summary: post.summary,
                content: post.content,
                images: post.images,
                like: post.like,
                tags: post.tags,
                views: post.views,
                createdAt: post.createdAt,
                author: {
                    _id: user ? user._id : null,
                    username: user ? user.username : null,
                    avatar: user ? user.avatar : null
                }
            };
            return formattedPost;
        }));

        // 对帖子数据进行排序（根据搜索文本在标题和内容中出现的次数）
        postDataWithAuthor.sort((postA, postB) => {
            const scoreA = (postA.title.match(new RegExp(searchText, 'gi')) || []).length + (postA.content.match(new RegExp(searchText, 'gi')) || []).length;
            const scoreB = (postB.title.match(new RegExp(searchText, 'gi')) || []).length + (postB.content.match(new RegExp(searchText, 'gi')) || []).length;
            if (scoreA !== scoreB) {
                return scoreB - scoreA; // 按分数降序排序
            } else {
                // 标题相同时，根据内容是否有搜索文本进行排序
                if (postA.content.includes(searchText) && !postB.content.includes(searchText)) {
                    return -1; // postA在前
                } else if (!postA.content.includes(searchText) && postB.content.includes(searchText)) {
                    return 1; // postB在前
                } else {
                    return 0; // 保持不变
                }
            }
        });
        res.json(postDataWithAuthor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/getSearchHot', (req, res) => {
    try {
        // 假的热搜数据
        const fakeHotSearches = ["Python编程入门", "JavaScript开发工具", "人工智能技术趋势", "英语学习资源", "网络安全认证", "C++编程竞赛", "机器学习算法教程", "音乐制作软件比较", "电影制作课程推荐", "摄影艺术展览", "Rust", "Golang语言教程"];
        // 获取当前时间戳
        const currentTime = Date.now();
        // 判断距离上一次请求的时间是否超过五分钟,超过五分钟了就重新更新数据
        if (currentTime - lastRequestTime >= 5 * 60 * 1000) {
            const randomIndexes = getRandomIndexes(fakeHotSearches.length, 9);
            const randomSearches = randomIndexes.map(index => fakeHotSearches[index]);
            lastRequestTime = currentTime;
            res.status(200).json(randomSearches)

        } else {

            // 如果请求间隔不足五分钟，返回相同的数据
            res.status(200).json(fakeHotSearches)
        }
    } catch (error) {
        // 处理错误
        console.error(error);
        res.status(500).json({ error: '服务器错误' });
    }

});


function getRandomIndexes(length, count) {
    const indexes = [];
    while (indexes.length < count) {
        const randomIndex = Math.floor(Math.random() * length);
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    }
    return indexes;
}

module.exports = router