const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    userName: {type: String, ref: 'users'},
    tenisId: { type: Number, ref: 'tenis' },
});

const tenisSchema = mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    image: String,
    likes: [likeSchema],
})


const Like = mongoose.model('likes', likeSchema);
const tenis = mongoose.model("tenis", tenisSchema);

module.exports = { Like, tenis };
