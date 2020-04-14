const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
    nome: String,
    url: String,
});

module.exports = mongoose.model('Link',LinkSchema);
