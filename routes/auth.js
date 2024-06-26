const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const {check, validationResult} = require('express-validator')

const User  = require('../models/User')


// @route       POST api/auth
// @ desc       Authenticate client and get token
// @access      Private
 router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()

],

async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });

    }

    const {email , password} = req.body;

    try {

        let user = await User.findOne({ email});

        if (!user) {
            return res.status(400).json({msg: 'Invalid credentials'}) 
        }

        const isMatch =  await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: 'Invalid credentials'})
        }

        const payload = {
            user :{
                id:user.id
            }
        }

        jwt.sign(payload, config.get('jwtsecret'), {
            expiresIn:10800
        }, (err, token) => {
            if (err) throw err ;
            res.json({ token})  
        })
        
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg : 'Server error'})
    }


}); 


// @route       GEt api/auth
// @ desc       Get logged in client
// @access      Public
router.get('/', auth, async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({msg: 'Server Error'})
    }
}); 






module.exports = router;
