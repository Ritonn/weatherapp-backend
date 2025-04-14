var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody')

router.post('/signup', (req, res) => {
 
    if (!checkBody(req.body, ["name", "email", "password"])) {
        res.json({ result: false, error: 'Missing or empty fields' })
        return;
    }

    const {email, password, name} = req.body;

    User.findOne( {email:  { $regex: new RegExp(email, 'i')}, password:  { $regex: new RegExp(password, 'i')}}).then(data => {
        if (data) {
            return res.json({ result: false, error: 'User already exists' })
        }

        const newUser = new User({
            name,
            email,
            password
        })

        newUser.save().then(() => {
            return res.json( { result: true })
        })
    })
    
})

router.post('/signin', (req, res) => {
    if (!checkBody(req.body, ["email", "password"])) {
        return res.json({ result: false, error: 'Missing or empty fields' })
    }

    const {email, password} = req.body;

    User.findOne( {email:  { $regex: new RegExp(email, 'i')}, password:  { $regex: new RegExp(password, 'i')}}).then(data => {
        if (!data) return res.json({ result: false, error: 'User not found' })
        
        return res.json( { result: true })
    })  
})


router.get('/', (req, res) => {
    User.find().then(res.json({ result: true }))
})

module.exports = router;