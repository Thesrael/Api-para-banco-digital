const bancoDeDados = require('../bancodedados');

const consultarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: "O número da conta e a senha são obrigatórios!" });
    }

    const conta = bancoDeDados.contas.find(conta => conta.numero === numero_conta);
    if (!conta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
    }

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta!" });
    }

    return res.status(200).json({ saldo: conta.saldo });
}

module.exports = consultarSaldo;
