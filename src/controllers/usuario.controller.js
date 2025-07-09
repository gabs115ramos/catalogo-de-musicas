const { Router } = require('express')
const usuarioModel = require('../models/usuario.model')
const security = require('../services/security')

const router = Router()

router.post('/', async (req, res) => {
    await usuarioModel.create(req.body)
    res.json({ mesagem: 'Usuário criado com sucesso...' })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    
    const usuario = await usuarioModel.findOne({ username })

    if (!usuario) {
        res.json({ mensagem: 'Usuário informado está incorreto...' })
        return;
    }

    if (usuario.password !== password) {
        res.json({ mensagem: 'A senha informada está incorreta...' })
        return;
    }

    const token = security.createToken(usuario.id)
    res.json({ token })
})

module.exports = router;