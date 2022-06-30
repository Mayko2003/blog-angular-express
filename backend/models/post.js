const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    status: { type: String, required: true, default: 'published' }
});

// export schema if doesn't exist
module.exports = mongoose.model.Post || mongoose.model('Post', postSchema);