const express = require('express');
const router = express.Router();
const Card = require("../models/Card")
const User = require('../models/User')
const Comment = require("../models/Comment")
const moment = require("moment")
router.post('/sendcomment', async (req, res) => {
    try {
        const { cardId, userId, commentBody } = req.body.data
        const card = await Card.findById(cardId)
        const user = await User.findById(userId)
        if (!card || !user) {
            return res.status(404).json({ message: '卡片或用户不存在' });
        }
        const newComment = new Comment({
            card: cardId,
            commenter: userId,
            content: commentBody,
            createdAt: new Date().getTime(),
            like: 0
        });
        const savedComment = await newComment.save();
        card.comment.push(savedComment._id);
        await card.save();
        console.log(savedComment);
        res.status(200).json({
            code: 200,
            message: '评论成功',
        })

    } catch (err) {

    }
})


router.post('/getcomment', async (req, res) => {
    try {
        const cardId = req.body.cardId;
        const card = await Card.findById(cardId).populate({
            path: 'comment',
            model: 'Comment',
            select: 'content createdAt like commentId',
            populate: {
                path: 'commenter',
                model: 'User',
                select: 'username avatar createdAt',
            },
            options: { sort: { 'createdAt': 1 } }
        });
        const comments = card.comment;
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});




module.exports = router 