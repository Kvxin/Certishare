const mongoose = require('mongoose');
const answerShama = new mongoose.Schema({
    title: {
        type: String
    },//题目
    answerKey: {
        type: String
    },//题目答案
    analysis: {
        type: String,
        default: '无'
    },//答案解析
    optionsData: {
        type: Object,
    },//选项
    type: {
        type: Array,
    }
})
const Answer = mongoose.model('Answer', answerShama)
module.exports = Answer