const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Usuario', usuarioSchema);