const express = require('express');
const router = express.Router(); //create a new router object using express.Router().
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "mhalkehalhaibabakidyataidesibahu"

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secpassword = await bcrypt.hash(req.body.password, salt) 
        try {
            await User.create({
                name: req.body.name,
                password: secpassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email }); //kisi ek ko find karega
            if (!userData) {
                return res.status(400).json({ error: "try logging with correct credentials" })
            }
            const pwtCompare = await bcrypt.compare(req.body.password, userData.password )
            if (!pwtCompare) {
                return res.status(400).json({ error: "try logging with correct credentials" })
            }
            const data = {
                user:{
                    id:userData.id
                }
            }

            const authToken = jwt.sign(data,jwtSecret )
            return res.json({ success: true, authToken:authToken })
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

module.exports = router;