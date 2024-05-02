const bancoDeDados = require('../bancodedados');

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    const contaExistente = bancoDeDados.contas.find(conta => conta.usuario.cpf === cpf || conta.usuario.email === email);
    if (contaExistente) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o CPF ou e-mail informado!" });
    }

    bancoDeDados.ultimoNumeroConta++;
    const numeroConta = String(bancoDeDados.ultimoNumeroConta);

    const novaConta = {
        numero: numeroConta,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };

    bancoDeDados.contas.push(novaConta);

    return res.status(201).send();
}

module.exports = criarConta;