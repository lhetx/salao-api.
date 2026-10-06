const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use('/servico', require('./routes/servico'));

app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada' });
});

app.use((erro, req, res, next) => {
  console.error(erro);
  res.status(erro.status || 500).json({
    mensagem: 'Erro ao processar a requisição'
  });
});

module.exports = app;