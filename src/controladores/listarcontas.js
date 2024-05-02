const bancoDeDados = require('../bancodedados');

const listarContas = (req, res) => {
    const { senha_banco } = req.query;

    if (!senha_banco || senha_banco !== bancoDeDados.banco.senha) {
        return res.status(400).json({ mensagem: "A senha do banco informada é inválida!" });
    }

    const contas = bancoDeDados.contas;
    return res.json(contas);
}

module.exports = listarContas;