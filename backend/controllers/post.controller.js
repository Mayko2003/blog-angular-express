const Post = require('../models/post.js');
const Comment = require('../models/comment.js');
const User = require('../models/user.js');

const postController = {};

postController.getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

postController.getPostBySlug = async (req, res) => {
    try{
        const post = await Post.findOne({ slug: req.params.slug }).populate('user', 'firstName lastName username').populate('comments').populate({path: 'comments', populate: {path: 'user', select: 'firstName lastName username'}});
        res.json(post);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}


postController.getPost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id).populate('user').populate('comments');
        res.json(post);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

postController.createPost = async (req, res) => {
    try{
        const post = new Post(req.body);
        await post.save();
        res.json({ message: 'Post created' });
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
}

postController.updatePost = async (req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body)
        res.json(post);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

postController.inactivatePost = async (req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, { status: 'inactive' });
        res.json(post);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

postController.getPublishedPosts = async (req, res) => {
    try{
        const posts = await Post.find({ status: 'active' });
        res.json(posts);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

postController.getRecentPosts = async (req, res) => {
    try{
        const posts = await Post.find({ status: 'active' }).sort({ createdAt: -1 }).limit(8).populate('user','username');
        res.json(posts);
    }
    catch(err){
        console.log("asdasd")
        res.status(500).json({ message: err.message });
    }
}


// exports the postController object
module.exports = postController;