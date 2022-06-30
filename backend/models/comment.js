const mongooose = require('mongoose');
const { Schema } = mongooose;

const commentSchema = new Schema({
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' }
})

// export schema if doesn't exist
module.exports = mongooose.model.Comment || mongooose.model('Comment', commentSchema);