const mongoose = require('mongoose');

const catalogoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  artista: { type: String, required: true },
  album: { type: String, required: false },
});

module.exports = mongoose.model('Catalogo', catalogoSchema);