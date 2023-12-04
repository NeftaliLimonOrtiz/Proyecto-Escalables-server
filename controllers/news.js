const { response, request } = require("express");

const {news} = require("../models/news");
const { reads} =require("../models/news");

const newsList = [
];

const getAllnews = (req = request, res = response) => {
    const { searchTerm } = req.query;
    news.find({name: RegExp(searchTerm)}).then(
        (result)=> {
            res.status(200).json({
                newsList: result,
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

const getNewsById = (req = request, res = response) => {
    const newsId = parseInt(req.params.id);

    news.findOne({ id: newsId }).then(
        (result) => {
            res.status(200).json({
                news: result
            })
        }
    ).catch((error) => {
        res.status(500).json({             
        })
    });
}

const deleteNewsById = (req = request, res = response) => {
    const newsId = parseInt(req.params.id);
  
    news.deleteOne({ id: newsId }).then((result)=>{
        res.status(200).json({
            msg: "elemento borrado con exito"
        });
    } ).catch((error)=>{
        res.status(500).json({
            msg: "error delete "
        });
    });
}

const createNews = (req = request, res = response) =>{
    
    const { id, name, image, description} = req.body

    if(!id || !name || !image || !description){
        res.status(400).json({
            msg: "datos invalidos"
        });
        return;
    }

    const newNews = news({
        id,  
        name,
        image,
        description,  
        read:false 
    });

    newNews.save().then((result) => {
        res.status(200).json({
            msg: "elemento insertado exitoso"
        });
    }).catch((error)=> {
        res.status(500).json({
            msg: "error insert "
        });
    });
};

const updateNews = (req = request, res= response) => {
    const {id,  name, image, description } = req.body;

    if (!id || !name || !image || !description) {
        res.status(400).json({
            msg: "Datos invalidos"
        });
        return;
    }

    news.updateOne({ id: id}, { name: name, image: image , description: description})
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

const getNewsDetail = async (req = request, res= response) => {
    try {
        const newsId = parseInt(req.params.id);

        const newsSearch = await news.findOne({ id: newsId });

        if (newsSearch) {
            res.status(200).json(newsSearch);
        } else {
            res.status(404).json({ message: "Tenis not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const markNewsAsRead = async (req = request, res = response) => {
    try {
        const newsId = parseInt(req.params.id);

        const updatedNews = await news.findOneAndUpdate(
            { id: newsId },
            { $set: { read: true } },
            { new: true }
        );

        if (updatedNews) {
            res.status(200).json({ message: "Noticia marcada como leída con éxito", news: updatedNews });
        } else {
            res.status(404).json({ message: "Noticia no encontrada" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const addRead = async (req, res) => {
    try {
        const { userName, newsId } = req.body;

        // Verificar si el tenis existe
        const newsfind = await news.findOne({ id: newsId });

        if (!newsfind) {
            return res.status(404).json({ success: false, error: "News not found" });
        }

        // Verificar si el usuario ya ha dado like
        if (newsfind.reads.some(reads => reads.userName === userName)) {
            return res.status(400).json({ success: false, error: "User already read this tenis" });
        }

        // Agregar el nombre de usuario al array de likes del tenis correspondiente
        newsfind.reads.push({ userName ,newsId });
        await newsfind.save();

        // Devolver la lista actualizada de likes
        const updatedReads = newsfind.reads.map(reads => reads.userName);

        res.status(201).json({ success: true, reads: { userName }, reads: updateNews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const getReads = async (req, res) => {
    const userName = req.params.userName;

    try {
        // Encuentra los tenis con likes del usuario específico
        const readNews = await news.find({ 'reads.userName': userName });

        if (readNews) {
            // Mapea para obtener los tenisId de los likes
            const newsId = readNews.map(news => news.reads.map(read => read.newsId)).flat();
            res.json(newsId);
        } else {
            res.json([]); // Si likedTenis es null, devolver un arreglo vacío o el valor que desees
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};



module.exports = {
    getAllnews,
    getNewsById,
    deleteNewsById,
    createNews,
    updateNews,
    getNewsDetail,
    markNewsAsRead,
    addRead,
    getReads
};
