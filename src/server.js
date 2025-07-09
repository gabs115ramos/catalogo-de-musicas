const express = require('express')
const app = express()
app.use(express.json())

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/catalogo')
  .then(() => {
    console.log('Conexão realizada com sucesso...')
  })
  .catch(e => {
    console.error('Erro ao tentar conectar-se ao banco de dados...', e)
  })

const { authorized } = require('./services/security')

app.use('/usuario', require('./controllers/usuario.controller'))

app.use('/catalogo', authorized, require('./controllers/catalogo.controller'))

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})
