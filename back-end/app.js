require("dotenv").config();
const db = require('./db/mongo');
const express = require("express");
const bodyParser = require("body-parser")
const cors = require('cors')
const port = 3011;
const app = express();
const login = require('./router/login')
const register = require('./router/register')
const code = require('./router/code')
const answer = require('./router/answer')
const card = require("./router/card")
const search = require("./router/search")
const comment = require("./router/comment")
const info = require('./router/info')
const upload = require("./router/upload")
const post = require("./router/post")
const signInRoutes = require('./router/sign');
const user = require("./router/user")
const carousel = require('./router/carousel')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(login)
app.use(register)
app.use(code)
app.use(answer)
app.use(search)
app.use(comment)
app.use(info)
app.use(upload)
app.use(post)
app.use(signInRoutes);
app.use(user)
app.use(carousel)
app.use("/api", card);
//链接数据库
db();
app.get('/', (req, res) => {
    res.send('听我说别搞！不要这样兄弟')
})
app.listen(port, () => {
    console.log("Server is running on port 3011");
})