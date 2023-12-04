const express = require("express");
const cors = require("cors");
const {default: mongoose, connection } = require ("mongoose");

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.connection_string = process.env.CONNECTION_STRING;

        this.tenisPath = "/api/tenis";
        this.authPath = "/api/auth";
        this.newsPath = "/api/news";


        this.middlewares();
        this.routes();
        this.db();
    }

    routes(){
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.tenisPath, require("../routes/tenis"));
        this.app.use(this.newsPath, require("../routes/news"));

       /*this.app.get("*", (req, res) => {
            res.status(404).send("error - ruta no encontrada")
        });*/
        
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    db(){
        mongoose.connect(this.connection_string).then(()=>{
            console.log("Conexión exitosa con la DB");
        }).catch((error)=>{
            console.log("Error al conectar con la DB");
            console.log(error);
        })
    }


    listen(){
        this.app.listen(this.port , ()=>{
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;