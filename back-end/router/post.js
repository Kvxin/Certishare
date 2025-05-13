const Post = require("../models/Post");
const express = require('express');
const router = express.Router();

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.aggregate([
            {
                $sample: { size: 10 }
            },
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
                    summary: 1,
                    content: 1,
                    createdAt: 1,
                    like: 1,
                    comments: 1,
                    views: 1,
                    tags: 1,
                    images: 1,
                    'authorDetails._id': 1,
                    'authorDetails.username': 1,
                    'authorDetails.email': 1,
                    'authorDetails.avatar': 1
                }
            }
        ]);

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


router.post('/post-info', async (req, res) => {
    const postId = req.body.id;
    const postInfo = await Post.findOne({ _id: postId }).populate('author', 'username avatar _id personSignature');
    if (postInfo) {
        res.json(postInfo)
    } else {
        res.status(404).json({ message: "未找到卡片信息" });
    }

})
module.exports = router;
