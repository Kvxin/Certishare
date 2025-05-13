const mongoose = require('mongoose');
const db = require("./db/mongo");
const Answer = require('./models/Answer');
db()

async function generateQuestions() {
    const questionTypes = ['Go', 'JavaScript', 'Rust', 'python类', '公共基础', '数据库', '云计算', '前端类'];
    const answerKeys = ['A', 'B', 'C', 'D'];
    let questions = [];

    for (let i = 0; i < 100; i++) {
        const typeIndex = Math.floor(Math.random() * questionTypes.length);
        const answerKeyIndex = Math.floor(Math.random() * answerKeys.length);
        const newQuestion = new Answer({
            title: `这是一道 关于 ${questionTypes[typeIndex]} 题目`,
            answerKey: `${answerKeys[answerKeyIndex]}`,
            analysis: `这是一个关于 ${questionTypes[typeIndex]} 题目的答案解析 ${i + 1}`,
            optionsData: {
                A: 'Option A',
                B: 'Option B',
                C: 'Option C',
                D: 'Option D'
            },
            type: [questionTypes[typeIndex]]
        });

        questions.push(newQuestion);
    }
    try {
        await Answer.insertMany(questions);
        console.log('100 questions generated and inserted successfully.');
    } catch (error) {
        console.error('Error inserting questions:', error);
    }
}

// Call the function to generate and insert questions
generateQuestions();