const { response, request } = require("express");

const user = require("../models/user");
const { tenis } = require("../models/tenis");
const { Like } = require('../models/tenis');

const tenisList = [
];

const getAllTenis = (req = request, res = response) => {
    const { searchTerm } = req.query;
    tenis.find({name: RegExp(searchTerm)}).then(
        (result)=> {
            res.status(200).json({
                tenisList: result,
                user: req.userActive
            })
        }
    ).catch(
        (error) => { 
            res.status(500).json({
                
            })

        }
    )
};

const getTenisById = (req = request, res = response) => {
    const tenisid = parseInt(req.params.id);

    tenis.findOne({ id: tenisid }).then(
        (result) => {
            res.status(200).json({
                tenis: result
            })
        }
    ).catch((error) => {
        res.status(500).json({             
        })
    });
}

const deleteTenisById = (req = request, res = response) => {
    const tenisid = parseInt(req.params.id);
  
    tenis.deleteOne({ id: tenisid }).then((result)=>{
        res.status(200).json({
            msg: "elemento borrado con exito"
        });
    } ).catch((error)=>{
        res.status(500).json({
            msg: "error delete "
        });
    });
}

const createTenis = (req = request, res = response) =>{
    
    const { id, name, price, image} = req.body

    if(!id || !name || !price || !image){
        res.status(400).json({
            msg: "datos invalidos"
        });
        return;
    }

    const newTenis = tenis({
        id,  
        name,
        price,
        image
    });

    newTenis.save().then((result) => {
        res.status(200).json({
            msg: "elemento insertado exitoso"
        });
    }).catch((error)=> {
        res.status(500).json({
            msg: "error insert "
        });
    });
};

const updateTenis = (req = request, res= response) => {
    const {id,  name, price, image } = req.body;

    if (!id || !name || !price || !image) {
        res.status(400).json({
            msg: "Datos invalidos"
        });
        return;
    }

    tenis.updateOne({ id: id}, { name: name, price: price, image: image })
        .then((result) => {
            res.status(200).json({
                msg: "Dato actualizado",
            });
        })
        .catch((error) => {
            res.status(500).json({
                msg: "Error interno del servidor",
            });
        });
};

const getTenisDetail = async (req = request, res= response) => {
    try {
        const tenisid = parseInt(req.params.id);

        const tenisSearch = await tenis.findOne({ id: tenisid });

        if (tenisSearch) {
            res.status(200).json(tenisSearch);
        } else {
            res.status(404).json({ message: "Tenis not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const addLike = async (req, res) => {
    try {
        const { userName, tenisId } = req.body;

        // Verificar si el tenis existe
        const tenisfind = await tenis.findOne({ id: tenisId });

        if (!tenisfind) {
            return res.status(404).json({ success: false, error: "Tenis not found" });
        }

        // Verificar si el usuario ya ha dado like
        if (tenisfind.likes.some(like => like.userName === userName)) {
            return res.status(400).json({ success: false, error: "User already liked this tenis" });
        }

        // Agregar el nombre de usuario al array de likes del tenis correspondiente
        tenisfind.likes.push({ userName ,tenisId });
        await tenisfind.save();

        // Devolver la lista actualizada de likes
        const updatedLikes = tenisfind.likes.map(like => like.userName);

        res.status(201).json({ success: true, like: { userName }, likes: updatedLikes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const getLikes = async (req, res) => {
    const userName = req.params.userName;

    try {
        // Encuentra los tenis con likes del usuario específico
        const likedTenis = await tenis.find({ 'likes.userName': userName });

        if (likedTenis) {
            // Mapea para obtener los tenisId de los likes
            const tenisIds = likedTenis.map(tenis => tenis.likes.map(like => like.tenisId)).flat();
            res.json(tenisIds);
        } else {
            res.json([]); // Si likedTenis es null, devolver un arreglo vacío o el valor que desees
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};



  

module.exports = {
    getAllTenis,
    getTenisById,
    deleteTenisById,
    createTenis,
    updateTenis,
    getTenisDetail,
    addLike,
    getLikes
};

