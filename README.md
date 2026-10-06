\# API Salão de Beleza



API REST feita com Node.js, Express e MariaDB/MySQL.



\## Como executar



1\. Instalar Node.js e MariaDB ou MySQL.

2\. Executar banco.sql no banco de dados.

3\. Abrir o Prompt de Comando na pasta do projeto.

4\. Instalar as dependências:



npm install



5\. Configurar a senha do banco no cmd:



set "DB\_PASSWORD=SUA\_SENHA"



6\. Iniciar:



npm start



A conexão usa 127.0.0.1, porta 3306, usuário root e banco salao.

Outras configurações podem ser ajustadas em config/banco.js.



\## Rotas



\- GET /servico — listar

\- GET /servico/:id — buscar pelo ID

\- POST /servico — cadastrar

\- PUT /servico/:id — atualizar

\- DELETE /servico/:id — excluir



\## Exemplo para POST e PUT



```json

{

&#x20; "nome": "Corte de cabelo",

&#x20; "duracao": 30,

&#x20; "preco": 45

}

```



Duração em minutos e preço em reais.



Endereço: http://localhost:3000/servico

