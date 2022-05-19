const VideoController = require('./controllers/VideoController.js')
const CategoriaController = require('./controllers/CategoriaController.js')
const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const VideosMiddleware = require('./Middleware/VideosMiddleware.js');
const CategoriasMiddleware = require('./Middleware/CategoriasMiddleware.js');
const UserController = require('./controllers/UserController.js');
const UserMiddleware = require('./Middleware/UserMiddleware.js');

routes.use(bodyParser.json()) // for parsing application/json
routes.use(bodyParser.urlencoded({ extended: false }))


// Rotas 
routes.get('/',(req, res) => {
    return res.status(200).send('O servidor está funcionando!!!')
})

routes.post('/add', (req,res) => {
    const body = req.body;

    if(!body)
        return res.status(400).end()

    db.push(body)
    return res.json(body)
})

//Rotas de acesso para os vídeos

routes.get('/videos',UserMiddleware.checkToken, VideoController.index)
routes.get ('/videos/busca', UserMiddleware.checkToken, VideoController.filter)
routes.get ('/videos/pages',UserMiddleware.checkToken, VideoController.pages)
routes.post('/videos', UserMiddleware.checkToken, VideoController.store)
routes.put('/videos/:id', UserMiddleware.checkToken, VideosMiddleware.validateId, VideoController.update); 
routes.delete('/videos/:id', UserMiddleware.checkToken, VideosMiddleware.validateId, VideoController.delete); 


//Rotas de acesso para as categorias
routes.get('/categorias',UserMiddleware.checkToken, CategoriaController.index)
routes.post('/categorias', UserMiddleware.checkToken, CategoriaController.store)
routes.put('/categorias/:id',UserMiddleware.checkToken, CategoriasMiddleware.validateId, CategoriaController.update); 
routes.delete('/categorias/:id', UserMiddleware.checkToken, CategoriasMiddleware.validateId, CategoriaController.delete); 

//Rotas de acesso para os usurários
routes.get('/user',  UserMiddleware.checkToken, UserController.index)
routes.post('/user', UserController.store)
routes.post('/user/login', UserController.auth)
routes.put('/user/:id',  UserMiddleware.checkToken, UserMiddleware.validateId ,UserController.update)
routes.delete('/user/:userId',UserMiddleware.checkToken, UserMiddleware.validateId ,UserController.delete); 


module.exports = routes; 
