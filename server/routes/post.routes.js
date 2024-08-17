const UserController = require('../controllers/user.controller');
const PostController = require('../controllers/post.controller');

module.exports = app => {
    app.get('/api/users', UserController.findAllUsers);
    app.get('/api/users/:id', UserController.findOneSingleUser);
    app.patch('/api/users/:id', UserController.updateExistingUser);
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);

    
    // // app.delete('/api/users/:id', UserController.deleteAnExistingUser);

    app.get('/api/posts', PostController.findAllPosts);
    app.get('/api/posts/:id', PostController.findOneSinglePost);
    app.patch('/api/posts/:id', PostController.updateExistingPost)
    app.post('/api/posts', PostController.createNewPost);
    app.delete('/api/posts/:id', PostController.deleteAnExistingPost);
    
}
//change rout