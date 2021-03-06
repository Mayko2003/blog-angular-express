const User = require('../models/user.js');

const userController = {};

userController.getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

userController.getUserByUsername = async (req, res) => {
    try{
        const user = await User.findOne({ username: req.params.username });
        res.json(user);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

userController.getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id).populate('posts').populate('comments');
        res.json(user);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

userController.createUser = async (req, res) => {
    try{
        const errors = {};
        //check if username exists
        var q = await User.findOne({ username: req.body.username });
        if(q) errors.username = 'Username already exists';
        //check if email is already in use
        q = await User.findOne({ email: req.body.email });
        if(q) errors.email = 'Email already in use';

        if(Object.keys(errors).length > 0){
            res.status(400).json(errors);
        }else{
            const user = new User(req.body);
            await user.save();
            res.json({ message: 'User created' });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

userController.updateUser = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        res.json(user);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

userController.inactivateUser = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, { status: 'inactive' });
        res.json(user);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}


// exports the userController object
module.exports = userController;