const UserController = require('../controllers/user.controller');
const PostController = require('../controllers/post.controller');
const MessageController = require('../controllers/message.controller'); // Import MessageController

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

   app.post('/api/messages/send', MessageController.sendMessage);
   app.get('/api/messages', MessageController.getMessages);
   app.get('/api/messages/between/:senderId/:receiverId', MessageController.GetMessagesBetweenUsers);


}
//change rout