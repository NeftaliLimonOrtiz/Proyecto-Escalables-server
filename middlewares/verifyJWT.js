const { response, request } = require("express")
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = (req= response, res=request, next) =>{

    const token = req.header("Authorization");
    if(!token){
        res.status(401).json({
            msg: "Token invalido",
        });
        return;
    }

    try{
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        User.findOne({ user:id}).then((result)=>{
            if(result){
                req.userActive = result;
                next();

            }else{
                res.status(401).json({
                    msg: "Token invalido",
                });
                return;
            }

        }).catch((error)=>{
            res.status(500).json({
                msg: "Error En el servidor",
            });
            return;
        });

    }catch (error){
        res.status(401).json({
            msg: "Token invalido",
        });
        return;
    }
   /* console.log(token);
    next();
-*/
}

module.exports = {
    validateJWT
}