const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('./../mailer')


const User = require('./../model/user-model');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            status: 'fail',
            data: {
                message: 'Please fill in all the fields'
            }
        })
    }

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(200).json({
                status: 'success',
                data: {
                    user: user
                }
            })
        }
    } catch (err) {
        console.log(err);
    }

    let newUser;
    try {
        const hash = await bcrypt.hash(password, 12);
        if (hash) {
            newUser = new User({
                name: name,
                email: email,
                password: hash
            })
            newUser.save()
                .then(data => console.log(data))
                .catch(err => {
                    throw err;
                });
        }

    } catch (err) {
        console.log(err)
        return res.json(500).json({
            status: 'fail',
            data: {
                message: 'An unknown error occured'
            }
        })
    }



    const mailData = {
        from: `${process.env.mail}`,  // sender address
        to: email,   // list of receivers
        subject: 'Welcome! Welcome! Welcome!',
        text: 'That was easy!',
        html: `<b>Hey there! </b>
                 <br> Welcome to my weekly newsletter<br/>`,
    };

    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            return console.log(err);
        }
        return res.status(200).json({
            status: 'success',
            data: {
                message: `Mail sent ${{ message_id: info.messageId }}`
            }
        })
    })




})






module.exports = router;