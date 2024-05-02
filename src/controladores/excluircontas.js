const bancoDeDados = require('../bancodedados');

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const indiceConta = bancoDeDados.contas.findIndex(conta => conta.numero === numeroConta);
    if (indiceConta === -1) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
    }

    if (bancoDeDados.contas[indiceConta].saldo !== 0) {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
    }

    bancoDeDados.contas.splice(indiceConta, 1);

    return res.status(204).send();
}

module.exports = excluirConta;
