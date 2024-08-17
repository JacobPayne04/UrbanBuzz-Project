const Post = require('../models/post.model');
const User = require('../models/user.model');

module.exports.findAllPosts = (req, res) => {
    Post.find()
        .then((allDaPosts) => {
            res.json({ posts: allDaPosts })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.findOneSinglePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(oneSinglePost => {
            res.json({ post: oneSinglePost })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.createNewPost = (req, res) => { ///             old way
    Post.create(req.body)
        .then(newlyCreatedPost => {
            res.json({ post: newlyCreatedPost })
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

//module.exports.createNewPost = (req, res) => {
 //    const userId = req.body.userId; // Assuming the userId is sent in the request body //       new way
 //   const newPost = new Post(req.body);
 //   newPost.save()
 //       .then((post) => {
 //           User.findById(userId)
  //             .then((user) => {
  //                 user.posts.push(post._id);
 //                   user.save()                         .then(() => {
//                             res.json({ post: post });
 //                        })
//                         .catch((err) => {
//                             res.status(500).json(err);
//                         });
//                 })
//                 .catch((err) => {
//                     res.status(500).json(err);
//                 });
//         })
//         .catch((err) => {
//             res.status(400).json(err);
//         });
// };





module.exports.updateExistingPost = (req, res) => {
    Post.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedPost => {
            res.json({ post: updatedPost })
        })
        .catch((err) => {
            res.status(400).json(err); /// this needs to be just json err unless otherwise possibnly ^^^^^^^^^^^^^^^^^
        });
}


function getUserWithPosts(req, res) {
    const userId = req.params.id;
    User.findById(userId).populate('posts').then((user) => {
        res.json(user);
    });
}







module.exports.deleteAnExistingPost = (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json(err)
        });
}

// Async await makes it easier to read
// TODO: this should be named pushPost because it is pushing ONE post.
// TODO: add this to routes or change your create post route to use this handler
module.exports.pushPosts = async (req, res) => {
    try {
        // Create new post
        const newPost = await Post.create(req.body);
        
        // Relate the new post to the user that created it so
        // you can fetch a user and .populate to fetch all their posts
        const updatedUser = await User.findByAndUpdate(
            req.body.user_id,
            { $push: { posts: docPost._id } },
            { new: true }
        );

        console.log('pushPosts: Added new post to user', updatedUser.email)
        
        // Respond with the new post
        // You could send back the updatedUser but it won't include their posts
        // unless you .populate them also.
        return res.json(newPost);
    } catch (error) {
        return res.status(400).json(err);
    }
};

// Nested .then
// module.exports.pushPosts = (req, res) => {
//     Post.create(req.body).then(docPost => {
//         console.log("\n>> created Post:\n", docPost);
//         User.findByAndUpdate(
//             req.body.user_id,
//             { $push: { posts: docPost._id } },
//             { new: true }
//         ).then(updatedUser => {
//             res.json(docPost)
//         }).catch((err) => {
//             res.status(400).json(err);
//         })
//     }).catch((err) => {
//         res.status(400).json(err);
//     })
// };