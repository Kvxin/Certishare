const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true // 唯一
    },
    // uid
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true
    },
    // 用户手机号码
    password: {
        type: String,
        required: true // 必需字段
    },
    // 用户密码，必需字段
    username: {
        type: String,
        required: true
    },
    // 用户名
    personSignature: {
        type: String,
        default: "这是一个非常个性的签名~"
    },
    //个性签名
    avatar: {
        type: String,
        default: "http://cdn.qiniu.img.kvxin.top/uploads/src%3Dhttp___ci.xiaohongshu.com_c34b7b74-ba38-0456-982a-43c0f97522fe_imageView2_2_w_1080_format_jpg%26refer%3Dhttp___ci.xiaohongshu.webp"
    },
    // 头像
    registrationDate: {
        type: String,
    },
    // 注册日期

    lastLoginDate: {
        type: String
    },
    // 最近登录日期

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    // 用户发布的帖子，是一个包含 Post 文档 ID 的数组

    birthday: {
        type: String
    },
    // 生日

    gender: {
        type: String,
    },
    // 性别

    email: {
        type: String,
        required: true
    },
    // 邮箱

    address: {
        type: String
    },
    // 用户地址

    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    // 用户收藏的卡片，是一个包含 Card 文档 ID 的数组

    cardHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    // 历史记录

    recentLikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    // 点赞记录

    createdLists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }],
    // 创建的列表

    profileBackground: {
        type: String,
        default: "http://cdn.qiniu.img.kvxin.top/uploads/src%3Dhttp___safe-img.xhscdn.com_bw1_84079a7f-0df5-485f-a81e-ced689065cc1_imageView2_2_w_1080_format_jpg%26refer%3Dhttp___safe-img.xhscdn.webp"
    },
    // 个人主页背景图

    watchedCardHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    // 观看卡片的历史记录

    followersCount: {
        type: Number,
        default: 0
    },
    // 粉丝数量

    followingCount: {
        type: Array,
        default: 0
    },
    // 关注数量

    totalLikes: {
        type: Number,
        default: 0
    },
    answerNum: {
        type: Number,
        default: 0
    },
    questionNum: {
        type: Number,
        default: 0,
    },
    passingRate: {
        type: Number,
        default: 0
    },
    isSuper: {
        type: Boolean,
        default: false
    },
    // 发布的卡片的获赞数量
    dates: [{
        type: String,
        required: true
    }],
    getAnswerLocalHost: [
        {
            type: Object
        }
    ],
    answerLocalhost: [
        {
            type: Object
        }
    ]
}, {
    collection: "users"
});

const User = mongoose.model('User', userSchema);

module.exports = User;
