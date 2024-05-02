const express = require('express');
const rotas = express();

const listarContas = require('./controladores/listarcontas');
const criarContas = require('./controladores/criarcontas');
const atualizarDados = require('./controladores/atualizardados');
const excluirContas = require('./controladores/excluircontas');
const depositar = require('./controladores/depositar');
const sacar = require('./controladores/sacar');
const transferir = require('./controladores/transferir');
const consultarSaldo = require('./controladores/consultarsaldo');
const extrato = require('./controladores/extrato');

rotas.get('/contas', listarContas);
rotas.post('/contas', criarContas);
rotas.put('/contas/:numeroConta/usuario', atualizarDados);
rotas.delete('/contas/:numeroConta', excluirContas);
rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo', consultarSaldo);
rotas.get('/contas/extrato', extrato);

module.exports = rotas;
