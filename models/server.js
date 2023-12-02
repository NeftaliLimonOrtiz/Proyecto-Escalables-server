const express = require("express");
const cors = require("cors");


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.tenisPath = "/api/tenis";

        this.middlewares();
        this.routes();
    }

    routes(){
        this.app.use(this.tenisPath, require("../routes/tenis"));

       /*this.app.get("*", (req, res) => {
            res.status(404).send("error - ruta no encontrada")
        });*/
        
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }


    listen(){
        this.app.listen(this.port , ()=>{
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;