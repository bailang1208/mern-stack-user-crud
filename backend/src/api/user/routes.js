const Router = require('express').Router();
const controller = require('./controller');

Router.route('/')
  .post(controller.saveUser);

Router.route('/:id')
  .put(controller.updateUser);

Router.route('/')
  .get(controller.getUsers);

Router.route('/:id')
  .get(controller.getUser);

Router.route('/:id')
  .delete(controller.deleteUser);

module.exports = Router;