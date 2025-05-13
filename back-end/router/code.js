require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const SMS = require('../models/SMS');

const router = express.Router();

const mailConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    secure: true,
};

const transporter = nodemailer.createTransport(mailConfig);


router.post('/sendVerification', async (req, res) => {
    const email = req.body.email;
    try {
        const flag = await findUser(email);
        if (flag) {
            res.status(429).json({ message: "验证码发送过于频繁,请等待验证码" });
            return;
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        await send(email, verificationCode);
        res.status(200).json({ message: "邮件已发送成功，请注意查收邮箱~", code: 200 });
    } catch (err) {
        res.status(429).json({ message: "请求次数过多" });
    }
});

const send = async (email, verificationCode) => {
    const mail = {
        from: `<${mailConfig.auth.user}>`,
        subject: '邮箱验证',
        to: email,
        html: `<h1>尊敬的用户您好：</h1><br>
               <h5>您正在进行邮箱验证，本次验证码为：<span style="color:#ec0808;font-size: 20px;">${verificationCode}</span>，请在10分钟内进行使用。</h5>
               <h5>如非本人操作，请忽略此邮件，由此给您带来的不便请谅解！</h5> <h5 style="text-align: right;"></h5>`,
    };
    try {
        await transporter.sendMail(mail);
        //将验证码添加到数据库中去
        await addSMS(email, verificationCode);
    } catch (error) {
        console.error("发送失败", error);
        throw error;
    }
};
/**
 * Asynchronous function to find a user by email.
 *
 * @param {string} email - the email of the user to find
 * @return {boolean} true if user exists and not expired, false otherwise
 */
const findUser = async (email) => {
    const sms = await SMS.find({ email: email });
    if (sms.length > 0) {
        const currentTime = new Date().getTime();
        const expireTime = sms[0].expireAt;
        if (currentTime > expireTime) {
            console.log(`${sms[0].email}的验证码${sms[0].code}已过期，已删除`);
            await SMS.deleteOne({ _id: sms[0]._id });
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

const addSMS = async (email, code) => {
    const expireAt = new Date(new Date().getTime() + 10 * 60 * 1000).getTime();
    const newSMS = new SMS({
        email: email,
        code: code,
        timestamp: new Date().getTime(),
        expireAt: expireAt
    });
    await newSMS.save();
};

module.exports = router;
