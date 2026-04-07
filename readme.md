# PDV - Sistema de Ponto de Venda (Front-end)

Interface web desenvolvida em HTML, CSS e JavaScript puro para interagir com a API do PDV.

---

## Sobre o projeto

Este é o front-end do sistema PDV (Ponto de Venda).
A interface permite cadastrar produtos, visualizar o estoque,
registrar vendas e consultar o histórico de vendas.

---

## Tecnologias utilizadas

- HTML5
- CSS3 (estilos personalizados)
- JavaScript puro (sem frameworks)
- Bootstrap 5 (layout)

---

## Estrutura do projeto
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
