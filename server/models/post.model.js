
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
   imageUrl: {
        type: String,
        // required: [true, "{PATH} is required"],
        // minLength: [3,"{PATH} must have at least 3 chracters"] 
    },
    property: {
        type: String,
        // required: [true, "{PATH} is required"],
        // minLength: [3,"{PATH} must have at least 3 chracters"] 
    },
    description: {
        type: String,
        // required: [true, "{PATH} is required"],
        // minLength: [3,"{PATH} must have at least 3 chracters"] 
    },
    user_id: {
        type: String,
        // required: [true, "{PATH} is required"],
        // minLength: [3,"{PATH} must have at least 3 chracters"] 
    }

}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post
