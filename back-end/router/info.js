const express = require('express');
const router = express.Router();

router.get('/getNav', (req, res) => {
    const navData = [
        { id: 1, name: '推荐', path: '/', },
        { id: 2, name: '英语四级', path: '/about' },
        { id: 3, name: '英语六级', path: '/products' },
        { id: 4, name: '计算机二级', path: '/services' },
        { id: 5, name: '计算机三级', path: '/contacta' },
        { id: 6, name: '计算机四级', path: '/contact' },
        { id: 7, name: '其他比赛', path: '/other' }
    ];
    res.status(200).json({ message: 'success', navData });
})
module.exports = router;