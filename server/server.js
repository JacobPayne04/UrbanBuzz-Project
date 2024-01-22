const express = require('express');
const cors = require('cors');
const cookies = require('cookie-parser')
const jwt = require("jsonwebtoken")
const secret = "the secret key"

module.exports.secret = secret
const app = express();
require('dotenv').config();
const port = process.env.PORT;
require('./config/mongoose.config'); // This is new
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new
app.use(cookies())
require('./routes/post.routes')(app);

app.use('/user/check_token', (req, res) => {
    const token = req.header('x-auth');
    if (!token || token === '' || token === 'undefined') {
        res.status(400)
        console.log('invalid');
        return;
    }
    //parse token.
    const data = jwt.decode(token);
    //find user by id.
    if (data) {
        User.findById(data.uid).then((userData) => {
            //check is the token exist in the tokens array.
            if (userData.tokens.indexOf(token) !== -1) {
                console.log("success");
            } else {
                res.status(400)
                console.log("invalid");
            }
        }).catch((e) => {
            res.status(400)
            console.log('invalid');
        });
    } else {
        res.status(400)
        console.log('invalid');
    }
});

module.exports.authenticate = (req, res, next) =>{
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            res.status(400).json({verified: false})
        }else{
            next()
        }
    })
}


app.listen(port, () => console.log(`🎤 Listening on port: ${port}`));