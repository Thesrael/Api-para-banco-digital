const bancoDeDados = require('../bancodedados');

const extrato = (req, res) => {
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

    const extrato = {
        depositos: bancoDeDados.depositos.filter(deposito => deposito.numero_conta === numero_conta),
        saques: bancoDeDados.saques.filter(saques => saques.numero_conta === numero_conta),
        transferenciasEnviadas: bancoDeDados.transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta),
        transferenciasRecebidas: bancoDeDados.transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta)
    };

    return res.status(200).json(extrato);
}

module.exports = extrato;