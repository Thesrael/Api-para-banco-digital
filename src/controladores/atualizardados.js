const bancoDeDados = require('../bancodedados');

const atualizarDados = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    const conta = bancoDeDados.contas.find(conta => conta.numero === numeroConta);
    if (!conta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontrada!" });
    }

    const outrasContasComCpfEmail = bancoDeDados.contas.filter(conta => conta.usuario.cpf === cpf && conta.numero !== numeroConta);
    if (outrasContasComCpfEmail.length > 0) {
        return res.status(400).json({ mensagem: "O CPF informado já existe cadastrado!" });
    }

    conta.usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    };

    return res.status(204).send();
}

module.exports = atualizarDados;
