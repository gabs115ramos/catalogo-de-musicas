const { Router } = require('express')
const catalogoService = require('../services/catalogo.service')

const router = Router()

router.get('/', async (req, res) => {
  const catalogos = await catalogoService.listarCatalogos()
  res.json(catalogos)
})

router.post('/', async (req, res) => {
    try {
        await catalogoService.criarCatalogo(req.body)        
        res.json({ mensagem: 'Dados criado com sucesso...' })
    } catch (e) {
        res.json({ message: 'Erro ao tentar criar catalogo', error: true, stack: e })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const catalogo = await catalogoService.atualizarCatalogo(id, req.body)

    if (!catalogo) {
        res.json({ mensage: 'Catalogo não encontrada' });
        return;
    }

    res.json({ mensagem: 'Dados atualizado com sucesso...' })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const excluiuCatalogo = await catalogoService.excluirCatalogo(id);
    if (excluiuCatalogo) {
        res.json({ message: 'Catalogo excluido com sucesso' })
        return
    }
    res.json({ mensagem: 'Registro não encontrado...' })
})

module.exports = router;