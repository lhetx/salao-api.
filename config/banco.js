const mysql = require('mysql');

const banco = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'salao'
});

module.exports = banco;
