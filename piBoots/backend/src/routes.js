const express = require('express');
const UsersController = require('./controllers/UsersController');
const PostsController = require('./controllers/PostsController');

const path = require ('path')
const routes = express.Router();

// const nome = new PostsController();

routes.get('/users', UsersController.index);
routes.get('/postOwner', UsersController.getPostOwner);
routes.get('/users/login', UsersController.login);
routes.post('/users', UsersController.createUser);
routes.post('/uplProfPic/:userId', UsersController.uplProfPic);
routes.delete('/users/delete/:userId', UsersController.deleteAccount);

routes.get('/posts', PostsController.index);
routes.get('/profPosts', PostsController.profPosts);
routes.use('/showUpload/:postId', PostsController.getUploadThumb);
routes.use('/profPic', express.static(path.resolve(__dirname, "profPics")));
routes.post('/posts/:userId', PostsController.postArt);
routes.post('/upload/:postId', PostsController.uplArt);

module.exports = routes

