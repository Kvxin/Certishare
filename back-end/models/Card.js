const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
    //标题
  },
  content: {
    type: String,
    required: true
    //内容
  },
  images: [
    {
      type: String,
      required: true
      //图片
    }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    //作者
  },
  tags: [],
  createdAt: {
    type: String,
    //发布时间
  },
  like: {
    type: Number,
    required: true,
    default: 0
    //点赞数量
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }
  ]
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
