const bcryptjs = require('bcryptjs');
const express = require('express');
const router = express.Router()

const UserModel = require('../models/user')


/**
 * Post request for login
 */
router.post('/login', async (req, res) => {

    try {
        const result = await UserModel.findOne({ email: req.body.email, password: req.body.password })
        if (result) {
            res.send(result)
        }
        else {
            res.status(500).json('Error')
        }
    }
    catch (error) {
        res.status(500).json({ message: error })
    }

})

/**
 * Post request for register
 */

router.post('/register', async (req, res) => {

    try {

        const newUser = new UserModel(req.body)
        await newUser.save()
        res.send('User registered successfully ')

    }
    catch (error) {
        res.status(500).json({ message: error })
    }

})

module.exports = router