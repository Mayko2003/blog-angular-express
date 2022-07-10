const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js')
const authController = {};

authController.verifyToken = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    res.status(401).json({ message: 'Unauthorized' });
                }
                else {
                    req.token = token;
                    next();
                }
            });
        }
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch(err){
        res.status(401).json({ message: 'Unauthorized' });
    }
}


authController.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const password = user.password;
        const decr = CryptoJS.AES.decrypt(password, process.env.PASSWORD_KEY).toString(CryptoJS.enc.Utf8);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            if (decr == req.body.password) {
                //generate a token 
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
                //send the token and user data in the response
                res.json({ jwt: token, user: user });
            }
            else {
                res.status(401).json({ message: 'Password incorrect' });
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

authController.getUser = async (req, res) => {
    try{
        const token = req.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        res.json(user);
    } catch(err){
        res.status(500).json({ message: err.message });
    }
}


// exports the authController object
module.exports = authController;