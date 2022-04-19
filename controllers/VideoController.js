const {response} = require('express');
const res = require('express/lib/response');
const {v4 : uuid} = require('uuid');
const Video = require('../models/Videos.js');
const mongoose = require('mongoose');
const { findById } = require('../models/Videos.js');
const Categorias = require('../models/Categorias.js');
const Videos = require('../models/Videos.js');
const { path } = require('express/lib/application');

 
module.exports ={
// para visualizar os dados
    async  index(request,response){
        try{
            const videos = await Video.find().populate('categoria');
            return response.status(200).json({videos});
        } catch (err) {
            response.status(500).json({error: err.mesage});
        }
    },


// para adicionar algum video post
    async store(request,response){

     const {title, url, desc, likes, categoria} = request.body;

    let CategoriaId;
       
    if(!categoria){
        CategoriaId = process.env.OpenId;
    }else {
        CategoriaId = categoria;
    }

    if(!title || !url){
        return response.status(400).json({ error : 'Title or Url missing'})
     }

 

     try {
        try {
             const categoriaId =  Categorias.findById(CategoriaId);
             
            if (categoriaId === null) {
                return res.status(400).json("Category does not exist...");
            }
        } catch (err) {
            return res.status(400).json(err);
        }} catch(err){
            return res.status(400).json(err);
        }
        
        const path = Categorias.find();
        console.log(path)

     const video = new Video({
        _id: uuid(),
        title,
        url,
        desc,
        likes,
        categoria: CategoriaId ,
     })
    
     

     try{
         await video.save();
         return response.status(201).json( {message : 'Video add sucessfully'})
     }catch (err){
         response.status(400).json({ error: err.message})
     }
    },
 
// para atualizar algum vídeo
    async update(request,response){
  
        const {title, url, desc, likes, categoria} = request.body;

        let CategoriaId;
    
        if(!categoria){
            CategoriaId = process.env.OpenId;
        }else {
            CategoriaId = categoria ;
        }
        
         try{
         const categoriaId =  Categorias.findById(CategoriaId);
    
         }catch (err){
            return response.status(400).json({ error : 'Category not exist'})
         } 

         if(!title && !url && likes && desc) {
            return response.status(400).json({error: "You must inform a new title or a new link, a new data!"});
        }
   
        if(title) response.video.title = title;
        if(url) response.video.url = url;
        if(desc) response.video.desc = desc;
        if(likes) response.video.likes = likes;
        if(categoria) response.video.categoria = CategoriaId;

        try {
            await response.video.save();
            return response.status(200).json({message: "Video updated Successfully!"})

        }catch(err){
            response.status(500).json({error: err.message});
        }
    },



 // função delete para deletar algum vídeo
    async delete(request, response){
        try{
            await response.video.remove()
            return response.status(200).json({message: "Deletado com sucesso"})
        }catch(err){
            return response.status(500).json({ error : err.message})
        }
    }
};



