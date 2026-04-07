// =============================================
// ENDEREÇO DA API
// Aqui definimos onde o servidor está rodando
// Todas as funções usam essa variável para saber
// para onde enviar as requisições
// =============================================
const API = 'http://127.0.0.1:5000';


// =============================================
// FUNÇÃO: mostrarAba
// Controla qual aba está visível na tela
// Quando clica em "Produtos" esconde "Vendas" e vice-versa
// =============================================
function mostrarAba(aba) {

    // Esconde as duas abas primeiro
    document.getElementById('aba-produtos').style.display = 'none';
    document.getElementById('aba-vendas').style.display = 'none';
    // document.getElementById busca um elemento HTML pelo seu id
    // style.display = 'none' esconde o elemento da tela

    // Mostra apenas a aba que foi clicada
    document.getElementById('aba-' + aba).style.display = 'block';
    // 'block' faz o elemento aparecer normalmente

    // Remove o destaque (active) de todos os botões das abas
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active'));
    // querySelectorAll busca todos os elementos com a classe .nav-link
    // forEach percorre cada um e remove a classe 'active'

    // Coloca o destaque no botão que foi clicado
    event.target.classList.add('active');
    // event.target = o elemento que foi clicado
}


// =============================================
// FUNÇÃO: mostrarMensagem
// Exibe uma mensagem de sucesso ou erro na tela
// Some automaticamente depois de 3 segundos
// =============================================
function mostrarMensagem(id, texto, tipo) {
    // id = qual div vai receber a mensagem (ex: 'msg-produto')
    // texto = o texto da mensagem
    // tipo = 'sucesso' (verde) ou 'erro' (vermelho)

    const el = document.getElementById(id);
    el.textContent = texto;               // define o texto da mensagem
    el.className = 'mensagem ' + tipo;    // aplica o estilo correto (sucesso ou erro)
    el.style.display = 'block';           // torna a mensagem visível

    // Depois de 3000 milissegundos (3 segundos), esconde a mensagem
    setTimeout(() => { el.style.display = 'none'; }, 3000);
}


// =============================================
// FUNÇÃO: cadastrarProduto
// Lê os dados do formulário e envia para a API
// Chama: POST /produtos/
// =============================================
function cadastrarProduto() {

    // Lê o valor de cada campo do formulário
    const nome    = document.getElementById('nome-produto').value;
    const preco   = parseFloat(document.getElementById('preco-produto').value);
    const estoque = parseInt(document.getElementById('estoque-produto').value);
    // parseFloat converte texto para número decimal (ex: "8.50" → 8.5)
    // parseInt converte texto para número inteiro (ex: "50" → 50)

    // Validação: verifica se todos os campos foram preenchidos
    if (!nome || isNaN(preco) || isNaN(estoque)) {
        mostrarMensagem('msg-produto', 'Preencha todos os campos!', 'erro');
        return;  // para a função aqui se tiver campo vazio
    }

    // fetch é a função do JavaScript para fazer requisições HTTP
    // Aqui estamos chamando o POST /produtos/ da nossa API
    fetch(API + '/produtos/', {
        method: 'POST',                                    // tipo da requisição
        headers: { 'Content-Type': 'application/json' },  // avisa que estamos enviando JSON
        body: JSON.stringify({ nome, preco, estoque })     // converte os dados para JSON
    })
    .then(res => res.json())   // quando a resposta chegar, converte de JSON para objeto JS
    .then(data => {
        // data é a resposta da API (ex: { "mensagem": "Produto cadastrado com sucesso!" })

        // Mostra mensagem de sucesso ou erro dependendo da resposta
        mostrarMensagem('msg-produto', data.mensagem || data.erro, data.mensagem ? 'sucesso' : 'erro');

        // Limpa os campos do formulário após cadastrar
        document.getElementById('nome-produto').value    = '';
        document.getElementById('preco-produto').value   = '';
        document.getElementById('estoque-produto').value = '';

        listarProdutos();  // atualiza a lista automaticamente
    })
    .catch(() => mostrarMensagem('msg-produto', 'Erro ao conectar com a API', 'erro'));
    // .catch captura erros de conexão (ex: servidor desligado)
}


// =============================================
// FUNÇÃO: listarProdutos
// Busca todos os produtos da API e exibe em cards
// Chama: GET /produtos/
// =============================================
function listarProdutos() {

    // fetch sem segundo parâmetro faz uma requisição GET por padrão
    fetch(API + '/produtos/')
    .then(res => res.json())
    .then(produtos => {
        // produtos é uma lista de objetos retornada pela API

        const div = document.getElementById('lista-produtos');

        // Se não tiver nenhum produto, exibe mensagem
        if (produtos.length === 0) {
            div.innerHTML = '<p class="text-muted">Nenhum produto cadastrado.</p>';
            return;
        }

        // .map() percorre cada produto e cria um card HTML para ele
        // .join('') une todos os cards em uma única string HTML
        div.innerHTML = produtos.map(p => `
            <div class="card-produto">
                <div>
                    <div class="nome">${p.nome}</div>
                    <div class="preco">R$ ${p.preco.toFixed(2)}</div>
                    <div class="estoque">Estoque: ${p.estoque} unidades</div>
                </div>
                <div>
                    <span class="text-muted me-3">ID: ${p.id}</span>
                    <button class="btn-deletar" onclick="deletarProduto(${p.id})">🗑 Deletar</button>
                </div>
            </div>
        `).join('');
        // toFixed(2) formata o número com 2 casas decimais (ex: 8.5 → "8.50")
        // ${} dentro do template literal insere o valor da variável no HTML
    })
    .catch(() => {
        document.getElementById('lista-produtos').innerHTML = '<p class="text-danger">Erro ao carregar produtos.</p>';
    });
}


// =============================================
// FUNÇÃO: deletarProduto
// Remove um produto pelo ID
// Chama: DELETE /produtos/{id}
// =============================================
function deletarProduto(id) {

    // Pede confirmação antes de deletar
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    // Se o usuário clicar em "Cancelar", a função para aqui

    fetch(API + '/produtos/' + id, { method: 'DELETE' })
    // Envia uma requisição DELETE para /produtos/1 (por exemplo)
    .then(res => res.json())
    .then(data => {
        alert(data.mensagem);  // mostra a mensagem de confirmação
        listarProdutos();      // atualiza a lista após deletar
    });
}


// =============================================
// FUNÇÃO: adicionarItem
// Adiciona uma nova linha de produto no formulário de venda
// O usuário pode adicionar quantos itens quiser
// =============================================
function adicionarItem() {

    const div = document.getElementById('itens-venda');

    // Cria um novo elemento div dinamicamente
    const linha = document.createElement('div');
    linha.className = 'row mb-2';

    // Define o HTML interno da linha com dois campos e um botão de remover
    linha.innerHTML = `
        <div class="col-md-5">
            <input type="number" class="form-control item-produto-id" placeholder="ID do produto">
        </div>
        <div class="col-md-5">
            <input type="number" class="form-control item-quantidade" placeholder="Quantidade">
        </div>
        <div class="col-md-2">
            <button class="btn btn-danger btn-sm" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;
    // this.parentElement.parentElement.remove() sobe dois níveis e remove a linha inteira

    div.appendChild(linha);
    // appendChild adiciona a linha ao final da div de itens
}


// =============================================
// FUNÇÃO: registrarVenda
// Coleta os itens adicionados e envia para a API
// Chama: POST /vendas/
// =============================================
function registrarVenda() {

    // Busca todos os campos de produto_id e quantidade na tela
    const ids         = document.querySelectorAll('.item-produto-id');
    const quantidades = document.querySelectorAll('.item-quantidade');
    // querySelectorAll retorna uma lista com todos os elementos que têm aquela classe

    const itens = [];  // lista que vamos enviar para a API

    // Percorre cada linha de item adicionada
    for (let i = 0; i < ids.length; i++) {
        const produto_id = parseInt(ids[i].value);
        const quantidade = parseInt(quantidades[i].value);

        // Verifica se os campos foram preenchidos corretamente
        if (isNaN(produto_id) || isNaN(quantidade)) {
            mostrarMensagem('msg-venda', 'Preencha todos os itens corretamente!', 'erro');
            return;
        }

        itens.push({ produto_id, quantidade });
        // push adiciona um novo objeto na lista itens
    }

    // Verifica se pelo menos um item foi adicionado
    if (itens.length === 0) {
        mostrarMensagem('msg-venda', 'Adicione pelo menos um item!', 'erro');
        return;
    }

    // Envia a venda para a API
    fetch(API + '/vendas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itens })
        // Envia: { "itens": [ {"produto_id": 1, "quantidade": 2} ] }
    })
    .then(res => res.json())
    .then(data => {
        if (data.mensagem) {
            // Venda registrada com sucesso
            mostrarMensagem('msg-venda', `Venda #${data.venda_id} registrada! Total: R$ ${data.total.toFixed(2)}`, 'sucesso');
            document.getElementById('itens-venda').innerHTML = '';  // limpa os itens da tela
            listarVendas();  // atualiza o histórico de vendas
        } else {
            // Algo deu errado (ex: estoque insuficiente)
            mostrarMensagem('msg-venda', data.erro, 'erro');
        }
    })
    .catch(() => mostrarMensagem('msg-venda', 'Erro ao conectar com a API', 'erro'));
}


// =============================================
// FUNÇÃO: listarVendas
// Busca todas as vendas da API e exibe em cards
// Chama: GET /vendas/
// =============================================
function listarVendas() {

    fetch(API + '/vendas/')
    .then(res => res.json())
    .then(vendas => {
        const div = document.getElementById('lista-vendas');

        if (vendas.length === 0) {
            div.innerHTML = '<p class="text-muted">Nenhuma venda registrada.</p>';
            return;
        }

        // Cria um card para cada venda
        div.innerHTML = vendas.map(v => `
            <div class="card-venda">
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>Venda #${v.id}</strong>
                        <span class="text-muted ms-3">${v.data_hora}</span>
                    </div>
                    <div class="total">R$ ${v.total.toFixed(2)}</div>
                </div>
                <button class="btn btn-outline-secondary btn-sm mt-2" onclick="verDetalhes(${v.id})">Ver detalhes</button>
                <div id="detalhes-${v.id}" style="display:none" class="mt-2"></div>
            </div>
        `).join('');
    });
}


// =============================================
// FUNÇÃO: verDetalhes
// Busca e exibe os itens de uma venda específica
// Chama: GET /vendas/{id}
// =============================================
function verDetalhes(id) {

    const div = document.getElementById('detalhes-' + id);

    // Se os detalhes já estão visíveis, esconde (funciona como um toggle)
    if (div.style.display === 'block') {
        div.style.display = 'none';
        return;
    }

    // Busca os detalhes da venda na API
    fetch(API + '/vendas/' + id)
    .then(res => res.json())
    .then(venda => {
        // Monta uma tabela HTML com os itens da venda
        div.innerHTML = `
            <table class="table table-sm mt-2">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Qtd</th>
                        <th>Preço unit.</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${venda.itens.map(i => `
                        <tr>
                            <td>${i.produto}</td>
                            <td>${i.quantidade}</td>
                            <td>R$ ${i.preco_unit.toFixed(2)}</td>
                            <td>R$ ${i.subtotal.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        div.style.display = 'block';  // exibe a tabela
    });
}


// =============================================
// INICIALIZAÇÃO
// Essa linha roda automaticamente quando a página abre
// Já carrega a lista de produtos sem precisar clicar em nada
// =============================================
listarProdutos();