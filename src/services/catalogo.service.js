const catalogoModel = require('../models/catalogo.model')

const listarCatalogos = async () => {
    return catalogoModel.find()
}

const criarCatalogo = async dadosCatalogo => {
    return catalogoModel.create(dadosCatalogo)
}

const atualizarCatalogo = async(id, { nome, telefone }) => {
    const catalogo = await catalogoModel.findById(id);
    if (!catalogo) return
    catalogo.nome = nome
    catalogo.telefone = telefone
    await catalogo.save()
    return catalogo
}

const excluirCatalogo = async id => {
    const catalogo = await catalogoModel.findById(id);
    if (!catalogo) return false
    await catalogo.deleteOne()
    return true
}

module.exports = {
    listarCatalogos,
    criarCatalogo,
    atualizarCatalogo,
    excluirCatalogo
}