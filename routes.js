const VideoController = require('./controllers/VideoController.js')
const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const VideosMiddleware = require('./Middleware/VideosMiddleware.js');

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


routes.get('/videos', VideoController.index)
routes.post('/videos', VideoController.store)
routes.put('/videos/:id', VideosMiddleware.validateId, VideoController.update); 
routes.delete('/videos/:id', VideosMiddleware.validateId, VideoController.delete); 


module.exports = routes; 
