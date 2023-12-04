const mongoose = require("mongoose");

const readsSquema = mongoose.Schema({
    userName: {type: String, ref: 'users'},
    newsId: { type: Number, ref: 'news' },
});

const newsSchema = mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    description: String,
    reads: [readsSquema]
})

const reads = mongoose.model("reads", readsSquema);
const news = mongoose.model("news", newsSchema)

module.exports = { reads, news};