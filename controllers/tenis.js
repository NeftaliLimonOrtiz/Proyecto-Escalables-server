const { response, request } = require("express");

const tenisList = [
    {
        "id": 1, 
        "name": "Jordan 1",
        "price": 1999,
        "image": "https://www.innvictus.com/medias/IN-DC0774-105-1.jpg?context=bWFzdGVyfGltYWdlc3w4NjY1MHxpbWFnZS9qcGVnfGltYWdlcy9oMTcvaGM0LzEyMTY4Njg3MTU3Mjc4LmpwZ3xjMzE1N2EyMTA2MTE4MGYzMWUxMmI0NTMwZTRmYTg2YjVkMzFmNGZmM2VjYjY1YTQzZjFiZWQzZjZkNTRmOWY3",
        
    },
    {
        "id": 2,
        "name": "Jordan 2",
        "price": 1999,
        "image": "https://www.innvictus.com/medias/tenis-air-jordan-2-cement-grey-in-DR8884-100-1.jpg?context=bWFzdGVyfGltYWdlc3w4MzQyNXxpbWFnZS9qcGVnfGltYWdlcy9oOTcvaDdmLzExNzY1NzU0MDAzNDg2LmpwZ3wyZmUwNmE0YjVkMDY5NjdlNzQ4MTIxYjEyZGU2MDlmZjBiMDhkZmZmZjgwODgzY2Y4MWFhNWE1ZDU3MjliM2Ez",
        
    },
    {
        "id": 3,
        "name": "Jordan 3",
        "price": 2012,
        "image": "https://www.innvictus.com/medias/IN-DZ3356-100-1.jpg?context=bWFzdGVyfGltYWdlc3wxNDgzNzF8aW1hZ2UvanBlZ3xpbWFnZXMvaGNhL2hkNC8xMjIwMzU3NzE0NzQyMi5qcGd8YTc3NGYxMTIxZDljMWFkMDc4MjI5MmZmNTkyOGIzOTAzY2ZiODhlMDhkNDFkZTBhZjY5MmVmYTY2NjcxYTYwZQ",
    },
];

const getAllTenis = (req = request, res = response) => {
    res.status(200).json({
        tenisList 
    });
};

module.exports = {
    getAllTenis
}

