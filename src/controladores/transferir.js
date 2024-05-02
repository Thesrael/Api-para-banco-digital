const bancoDeDados = require('../bancodedados');

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    const contaOrigem = bancoDeDados.contas.find(conta => conta.numero === numero_conta_origem);
    const contaDestino = bancoDeDados.contas.find(conta => conta.numero === numero_conta_destino);
    if (!contaOrigem || !contaDestino) {
        return res.status(404).json({ mensagem: "Uma ou ambas as contas bancárias não foram encontradas!" });
    }

    if (contaOrigem.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta!" });
    }

    if (contaOrigem.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente para realizar a transferência!" });
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    bancoDeDados.transferencias.push({
        data: new Date().toISOString(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    });

    return res.status(204).send();
}

module.exports = transferir;
