const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const User = require('../models/User')

//获取题目列表
router.get('/getQuestion', async (req, res) => {
    try {
        const keyword = req.query.data.split(',');
        const userId = req.query.userId;
        let answers = await Answer.find();
        const user = await User.findById(userId);
        const uniqueTypes = mergeAndDeduplicateTypes(answers);
        const commonElements = findCommonElements(keyword, uniqueTypes);
        if (commonElements.length === 0) {
            res.json({
                code: 400,
                message: "没有符合条件的题目"
            })
            return;
        }
        answers = await Answer.find({
            'type': { $in: commonElements }
        })
        const selectedIndices = [];
        while (selectedIndices.length < 10 && selectedIndices.length < answers.length) {
            const randomIndex = Math.floor(Math.random() * answers.length);
            if (!selectedIndices.includes(randomIndex)) {
                selectedIndices.push(randomIndex);
            }
        }
        const selectedAnswers = selectedIndices.map(index => answers[index]);
        const answerDatas = {
            answers: selectedAnswers,
            types: keyword
        }
        user.getAnswerLocalHost.push(answerDatas);
        await user.save();
        res.json({
            code: 200,
            message: "题目获取成功",
            data: selectedAnswers
        });
    } catch (error) {
        console.log(error);
    }
})
function findCommonElements(arr1, arr2) {
    const commonElements = [];
    for (const element of arr1) {
        if (arr2.includes(element)) {
            commonElements.push(element);
        }
    }
    return commonElements;
}
function mergeAndDeduplicateTypes(data) {
    const allTypes = [];
    data.forEach(item => {
        allTypes.push(...item.type);
    });
    const uniqueTypes = [...new Set(allTypes)];
    return uniqueTypes;
}

router.post('/post-answer', async (req, res) => {
    try {
        const result = JSON.parse(req.query.data);
        const userAnswers = result.userAnswers;
        const userId = result.userId;
        const user = await User.findById(userId);

        const wrongQuestions = []; // 错误问题数组
        let wrongCount = 0; // 错误计数
        const typeWrongCount = {}; // 错误类型计数对象

        for (let userAnswer of userAnswers) {
            const dbAnswer = await Answer.findById(userAnswer._id);
            if (dbAnswer && dbAnswer.answerKey !== userAnswer.answerKey) {
                wrongCount++;
                wrongQuestions.push({
                    _id: dbAnswer._id,
                    title: dbAnswer.title,
                    correctAnswer: dbAnswer.answerKey,
                    userAnswer: userAnswer.answerKey,
                    optionsData: dbAnswer.optionsData,
                    analysis: dbAnswer.analysis,
                    type: dbAnswer.type
                });

                // 更新错误类型计数
                dbAnswer.type.forEach(type => {
                    typeWrongCount[type] = (typeWrongCount[type] || 0) + 1;
                });
            }
        }

        // 更新用户信息
        const totalQuestions = userAnswers.length;
        const correctCount = totalQuestions - wrongCount;
        const passingRate = (correctCount / totalQuestions) * 100;
        user.answerNum += 1;
        user.questionNum += totalQuestions;
        // 更新通过率
        user.passingRate = ((user.passingRate || 0) * (user.answerNum - 1) + passingRate) / user.answerNum;
        // 添加到用户的答案历史
        user.answerLocalhost.push({
            wrongQuestions,
            wrongCount,
            passingRate,
            typeWrongCount
        });
        await user.save();
        res.status(200).json({
            code: 200,
            msg: "获取成功",
            data: {
                wrongQuestions,
                wrongCount,
                passingRate,
                typeWrongCount, // 返回每种类型的错误计数
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;


module.exports = router;