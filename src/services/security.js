const jwt = require('jsonwebtoken')

const MINHA_CHAVE_SECRETA = 'abacate'


// Middleware
const authorized = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        res.json({ mensgem: 'Você não está autorizado.' })
        return
    }

    const [bearer, token] = authorization.split(' ')

    if (!/Bearer/.test(bearer)) {
        res.json({ mensgem: 'Token mal formatado.' })
        return
    }

    try {
        const isOk = jwt.verify(token, MINHA_CHAVE_SECRETA);
        if (!isOk) {
            res.json({ mensgem: 'Você não está autorizado.' })
            return
        }
        next()
    } catch (e) {
        res.json({ message: 'Erro ao verificar o token', error: true, stack: e })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, MINHA_CHAVE_SECRETA, { expiresIn: '1y' })
}

module.exports = {
    authorized,
    createToken
}