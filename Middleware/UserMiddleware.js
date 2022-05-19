
const { response } = require("express");
const res = require("express/lib/response");
const { validate: isUuid } = require("uuid");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    async validateId(request, response, next) {
        const { id } = request.params

        if(!isUuid(id)) {
            return response.status(400).json({error: "Invalid ID."})
        }

        try {
            const user = await User.findById(id);
            response.user = user;
            if(!user) {
                return response.status(404).json({ error: "User not found." })
            }
        }catch (err) {
            return response.status(500).json({ error: err.message });
        }

        next()
    },

    async checkToken(request, response, next){
        const token = request.headers['authorization']


        if(!token) {
            return response.status(401).json({ error: "You dont have acess" })
        }
    
    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
        }catch (err) {
        return response.status(400).json({ error: "Token invalido" });
    }

   
    }
}
