const User = require('../models/user.js');

const commentController = {};

commentController.getAllCommentsByPost = async (req, res) => {
    try{
        const comments = await Comment.find({ post: req.params.id });
        res.json(comments);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

commentController.createComment = async (req, res) => {
    try{
        const comment = new Comment(req.body);
        await comment.save();
        res.json({ message: 'Comment created' });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}


// exports the commentController object
module.exports = commentController;
