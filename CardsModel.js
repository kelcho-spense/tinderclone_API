const mongoose = require('mongoose');
const cardSchema = mongoose.Schema({
    name: String,
    imgurl: String,
})

module.exports = mongoose.model('CardSchema', cardSchema);