const express = require('express');
const banco = require('../config/banco');

const router = express.Router();

// Conferir o ID recebido na URL.
router.param('id', (req, res, next, valor) => {
  const id = Number(valor);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      mensagem: 'ID deve ser um inteiro positivo'
    });
  }

  req.servicoId = id;
  next();
});

// Conferir os dados do cadastro e da atualização.
function validar(req, res, next) {
  const { nome, duracao, preco } = req.body || {};

  if (
    typeof nome !== 'string' ||
    !nome.trim() ||
    nome.trim().length > 100 ||
    !Number.isInteger(duracao) ||
    duracao <= 0 ||
    typeof preco !== 'number' ||
    !Number.isFinite(preco) ||
    preco < 0 ||
    preco > 99999999.99
  ) {
    return res.status(400).json({
      mensagem:
        'Informe nome com até 100 caracteres, duração inteira ' +
        'positiva e preço numérico entre 0 e 99999999.99'
    });
  }

  req.dados = { nome: nome.trim(), duracao, preco };
  next();
}

function erroBanco(res, erro) {
  console.error(erro);

  return res.status(500).json({
    mensagem: 'Erro ao acessar o banco'
  });
}

// Listar todos os serviços.
router.get('/', (req, res) => {
  banco.query(
    'SELECT * FROM servico ORDER BY id',
    (erro, linhas) => {
      if (erro) return erroBanco(res, erro);

      res.status(200).json(linhas);
    }
  );
});

// Buscar um serviço pelo ID.
router.get('/:id', (req, res) => {
  banco.query(
    'SELECT * FROM servico WHERE id = ?',
    [req.servicoId],
    (erro, linhas) => {
      if (erro) return erroBanco(res, erro);

      if (linhas.length === 0) {
        return res.status(404).json({
          mensagem: 'Serviço não encontrado'
        });
      }

      res.status(200).json(linhas[0]);
    }
  );
});

// Cadastrar um serviço.
router.post('/', validar, (req, res) => {
  const { nome, duracao, preco } = req.dados;

  banco.query(
    'INSERT INTO servico (nome, duracao, preco) VALUES (?, ?, ?)',
    [nome, duracao, preco],
    (erro, resultado) => {
      if (erro) return erroBanco(res, erro);

      res.status(201).json({
        mensagem: 'Serviço cadastrado',
        id: resultado.insertId
      });
    }
  );
});

// Atualizar um serviço.
router.put('/:id', validar, (req, res) => {
  const { nome, duracao, preco } = req.dados;

  banco.query(
    'UPDATE servico SET nome = ?, duracao = ?, preco = ? WHERE id = ?',
    [nome, duracao, preco, req.servicoId],
    (erro, resultado) => {
      if (erro) return erroBanco(res, erro);

      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensagem: 'Serviço não encontrado'
        });
      }

      res.status(200).json({
        mensagem: 'Serviço atualizado'
      });
    }
  );
});

// Excluir um serviço.
router.delete('/:id', (req, res) => {
  banco.query(
    'DELETE FROM servico WHERE id = ?',
    [req.servicoId],
    (erro, resultado) => {
      if (erro) return erroBanco(res, erro);

      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensagem: 'Serviço não encontrado'
        });
      }

      res.status(200).json({
        mensagem: 'Serviço excluído'
      });
    }
  );
});

module.exports = router;
