const bancoDeDados = require('../bancodedados');

function sacar(req, res) {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: "O número da conta, o valor e a senha são obrigatórios!" });
    }

    const conta = bancoDeDados.contas.find(conta => conta.numero === numero_conta);
    if (!conta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
    }

    if (conta.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente!" });
    }

    conta.saldo -= valor;

    bancoDeDados.saques.push({
        data: new Date().toISOString(),
        numero_conta,
        valor
    });

    return res.status(204).send();
}

module.exports = sacar;
