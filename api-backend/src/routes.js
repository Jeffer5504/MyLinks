const { Router } = require('express');
const LinkController = require('./controllers/LinkController');


const routes = Router();

routes.get('/', LinkController.index);
routes.post('/links', LinkController.store);
routes.delete('/links/:id', LinkController.destroy);

module.exports = routes;
