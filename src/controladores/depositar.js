const bancoDeDados = require('../bancodedados');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" });
    }

    const conta = bancoDeDados.contas.find(conta => conta.numero === numero_conta);
    if (!conta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor do depósito deve ser maior que zero!" });
    }

    conta.saldo += valor;

    bancoDeDados.depositos.push({
        data: new Date().toISOString(),
        numero_conta,
        valor
    });

    return res.status(204).send();
}

module.exports = depositar;
