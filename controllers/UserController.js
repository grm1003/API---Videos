const {response} = require('express');
const res = require('express/lib/response');
const req = require('express/lib/request');
const {v4 : uuid} = require('uuid');
const mongoose = require('mongoose');
const express = require ("express")
const router = express.Router()
const bcrypt = require ("bcrypt")
const User = require ("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
require("dotenv").config();
dotenv.config();

module.exports ={
// para visualizar os dados
async  index(request,response){
    try{
        const user = await User.find();
        return response.status(200).json({user});
    } catch (err) {
        response.status(500).json({error: err.mesage});
    }
},


//para salvar os dados
async  store (request,response){
    const {email, password} = request.body;
   
    if(!email){
       return response.status(400).json({ error : 'Email missing'})
    }

    if(!password){
        return response.status(400).json({ error : 'Password  missing'})
     }

    // verificação de existencia do email no banco 
    const UserExists = await User.findOne({ email : email}) 
    
    if(UserExists){
        return response.status(422).json({ error : 'This email is already was used'})
     }

    //para gerar a senha hash
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)
     

     const user = new User ({
        _id: uuid(),
        email: request.body.email,
        password: hash,

     })

    try{
        await user.save();
        return response.status(201).json( {message : 'User add sucessfully'})
    }catch (err){
        response.status(400).json({ error: err.mensage})
    }
   },

//para fazer login
async auth (request,response){
    const {email, password} = request.body;
   
    if(!email){
       return response.status(400).json({ error : 'Email missing'})
    }

    if(!password){
        return response.status(400).json({ error : 'Password missing'})
     }

    // verificação de existencia do user no banco 
    const user_auth = await User.findOne({ email : email}) 
    
    if(!user_auth){
        return response.status(404).json({ error : 'User not found'})
     }
    
    // check se os dados de senha são os mesmos
     const Checkpassword = await bcrypt.compare( password, user_auth.password)
      
     if(!Checkpassword){
        return response.status(422).json({ error : 'UNAUTHORIZED ACCESS'})
     }

     try{
         const secret = process.env.SECRET
        
         const token = jwt.sign(
             {
                 id: user_auth._id,
             },
             secret,
         )
    
         response.status(200).json({ mensage : 'Acesso autorizado', token})

     }catch(err){
        console.log(err)
        
         return response.status(500).json({ error : 'Sorry, server is not working , try again later'})

     }
   },



// para atualizar dados
async update(request,response){
    const {email, password} = request.body;

    if(!email && !password) {
        return response.status(400).json({error: "You must inform a new email or a new password, a new data!"});
    }

    if(email) response.user.email = email;

    if(password){ 
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)
    response.user.password = hash;
    }

    
    try {
        await response.user.save();
        return response.status(200).json({message: "User updated Successfully!"})

    }catch(err){
        response.status(500).json({error: err.message});
    }
},

//para deletar os dados
async delete (request,response){
    try{
        await response.user.remove({ _id: request.params.userId}).exec()
        return response.status(200).json({message: "Deletado com sucesso"})
    }catch(err){
        return response.status(500).json({ error : err.message})
    }
}
};




/* async  (request,body){
   
    User.find({email: request.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "O email já existe."
            })
        } else {
            bcrypt.hash(request.body.email, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User ({
                        _id: uuid(),
                        email: request.body.email,
                        password: hash,
                    })
                    user
                    .save()
                    .then(result => {
                            console.log (result)
                            res.status(201).json({
                                message: 'Usuário criado!'
                            })
                        }
                    )
                    .catch( err => {
                        console.log(err)
                        res.status(500).json ({
                            error: err
                        })
                    })
                }
            })
        }
    })
  
} , */