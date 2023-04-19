const jsw = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const { registerValidator } = require('../../util/auth')

class AuthController{
    //[POST] /auth/register
    async register(req, res, next){
        const { error } = registerValidator(req.body);

        if (error) return res.status(422).send(error.details[0].message);

        const checkEmailExist = await User.findOne({ email: req.body.email });

        if (checkEmailExist) return res.status(422).send('Email is exist');

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            role: 'User',
            password: hashPassword,
        });

        try {
            const newUser = await user.save();
            await res.send(newUser);
        } catch (err) {
            res.status(400).send(err);
        }
    }
    //[POST] /auth/login
    async login(req, res, next){
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(422).send('Email or Password is not correct');

        const checkPassword = await bcrypt.compare(req.body.password, user.password);

        if (!checkPassword) return res.status(422).send('Email or Password is not correct');
        
        const token = jsw.sign({_id: user._id, role: user.role}, '${process.env.ACCESS_TOKEN_SECRET}', { expiresIn: '5m' });

        res.header('auth-token', token).send(token); 
    }
}
module.exports = new AuthController