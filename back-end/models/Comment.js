const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        //评论者
    },
    content: {
        type: String,
        required: true
        //内容
    },
    createdAt: {
        type: String,
        //发布时间
    },
    like: {
        type: String,
        require: true
        //点赞数量
    }
});
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;