# PDV - Sistema de Ponto de Venda (Back-end)

API desenvolvida em Python com Flask para gerenciar produtos e vendas de um ponto de venda simples.

---

## Sobre o projeto

Este sistema foi desenvolvido como MVP (Minimum Viable Product) de um PDV (Ponto de Venda).
A API permite cadastrar produtos, controlar estoque e registrar vendas com múltiplos itens.

---

## Tecnologias utilizadas

- Python 3
- Flask
- Flask-RestX (Swagger)
- Flask-CORS
- SQLite (banco de dados)

---

## Estrutura do projeto
pdv-backend/
├── app.py       → código principal da API
└── pdv.db       → banco de dados (criado automaticamente)

---

## Como instalar e rodar

### 1. Certifique-se de ter o Python instalado
python --version

### 2. Instale as dependências
pip install flask flask-restx flask-cors

### 3. Rode o servidor
python app.py

### 4. Acesse a documentação Swagger

Abra o navegador e acesse:
http://127.0.0.1:5000/swagger

---

## Rotas disponíveis

| Método | Rota | Descrição |
|---|---|---|
| GET | /produtos/ | Lista todos os produtos |
| POST | /produtos/ | Cadastra um novo produto |
| GET | /produtos/{id} | Busca um produto pelo ID |
| DELETE | /produtos/{id} | Remove um produto pelo ID |
| GET | /vendas/ | Lista todas as vendas |
| POST | /vendas/ | Registra uma nova venda |
| GET | /vendas/{id} | Busca os detalhes de uma venda |

---

## Banco de dados

O banco de dados SQLite é criado automaticamente ao rodar o servidor pela primeira vez.
Três tabelas são criadas:

- **produtos** → armazena os produtos cadastrados
- **vendas** → registra cada venda realizada
- **itens_venda** → detalha os produtos de cada venda
pdv-frontend/
├── index.html   → estrutura da página
├── styles.css   → estilos personalizados
└── scripts.js   → funções JavaScript
---

## Como rodar

### 1. Certifique-se que o back-end está rodando

Antes de abrir o front-end, o servidor da API precisa estar ativo.
Consulte o README do repositório pdv-backend para instruções.

### 2. Abra o front-end no navegador

Basta dar dois cliques no arquivo **index.html**.
Não é necessário instalar nada ou usar um servidor local.

---

## Funcionalidades

### Aba Produtos
- Cadastrar novo produto (nome, preço e estoque)
- Listar todos os produtos em cards
- Deletar um produto pelo ID

### Aba Vendas
- Adicionar itens à venda (ID do produto e quantidade)
- Finalizar e registrar a venda
- Listar histórico de vendas
- Ver detalhes de cada venda (produtos, quantidades e subtotais)

---

## Rotas da API utilizadas

| Função | Método | Rota |
|---|---|---|
| Listar produtos | GET | /produtos/ |
| Cadastrar produto | POST | /produtos/ |
| Deletar produto | DELETE | /produtos/{id} |
| Registrar venda | POST | /vendas/ |
| Listar vendas | GET | /vendas/ |
| Ver detalhes da venda | GET | /vendas/{id} |