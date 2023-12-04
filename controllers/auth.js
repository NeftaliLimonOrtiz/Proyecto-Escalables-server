const { response, request } = require("express");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const getLogin = (req = request, res = response)=>{
    const { user, password } = req.body;

    if( !user || !password){
        res.status(400).json({
            msg: "Datos Invalidos"
        })
    }

    User.findOne({ user: user, password: password}).then((result) => {
        if(result){
            generateJWT(user).then((token)=>{
                res.status(200).json({
                    token: token,
                    msg: "token"
                })
            }).catch((error)=>{
                res.status(500).json({
                    msg:error,
                })
            })
        }else{
            res.status(401).json({
                msg: "Login Invalido"
            })
        
        }
    })

}


module.exports = {
    getLogin
}
