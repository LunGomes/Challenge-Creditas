document.addEventListener('DOMContentLoaded', () => {

    //Puxar os elementos dos Acordeões
    const btnParcelas = document.getElementById('btn-toggle-parcelas');
    const contentParcelas = document.getElementById('content-parcelas');
    const iconParcelas = document.getElementById('icon-parcelas');
    const btnNovoCartao = document.getElementById('btn-toggle-novo-cartao');
    const contentNovoCartao = document.getElementById('content-novo-cartao');
    const iconNovoCartao = document.getElementById('icon-novo-cartao');
    
    // Puxar os elementos do Modal de Senha
    const modalSenhaContainer = document.getElementById('modal-senha-container');
    const btnModalFecharBackdrop = document.getElementById('btn-modal-fechar-backdrop');
    const btnModalFecharLink = document.getElementById('btn-modal-fechar-link');
    const btnModalContinuar = document.getElementById('btn-modal-continuar');

    // Puxar os elementos do Formulário
    const formNovoCartao = document.getElementById('form-novo-cartao');
    const inputNumeroCartao = document.getElementById('numero');
    const inputCVV = document.getElementById('cvv');
    const inputValidade = document.getElementById('validade');
    const inputNome = document.getElementById('nome');
    const spanDigitos = document.getElementById('cartao-final-digitos');

    // Puxar os elementos do Botão de Realizar Pagamento
    const btnRealizarPagamento = document.getElementById('btn-realizar-pagamento');

    // **** CAMPOS DE ENDEREÇO (PUXADOS AQUI) ****
    const inputCEP = document.getElementById('cep');
    const inputRua = document.getElementById('rua');
    const inputCidade = document.getElementById('cidade');
    const inputEstado = document.getElementById('estado');
    const inputNumEnd = document.getElementById('num_end');

    //Lógica do Acordeão de Parcelas
    btnParcelas.addEventListener('click', () => {
        const estaFechado = contentParcelas.classList.contains('hidden');
        contentNovoCartao.classList.add('hidden');
        iconNovoCartao.className = "fa-solid fa-chevron-right text-lime-500 text-xs";
        contentParcelas.classList.toggle('hidden');
        iconParcelas.className = estaFechado ? "fa-solid fa-chevron-down text-lime-500 text-xs" : "fa-solid fa-chevron-right text-lime-500 text-xs";
    });

    //Lógica do Acordeão de Novo Cartão
    btnNovoCartao.addEventListener('click', () => {
        const estaFechado = contentNovoCartao.classList.contains('hidden');
        contentParcelas.classList.add('hidden');
        iconParcelas.className = "fa-solid fa-chevron-right text-lime-500 text-xs";
        contentNovoCartao.classList.toggle('hidden');
        iconNovoCartao.className = estaFechado ? "fa-solid fa-chevron-down text-lime-500 text-xs" : "fa-solid fa-chevron-right text-lime-500 text-xs";
    });

    // Lógica do 'Submit' do Formulário de Novo Cartão
    formNovoCartao.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const numeroCompleto = inputNumeroCartao.value.replace(/\s/g, '');
        const ultimosQuatro = numeroCompleto.slice(-4);

        if (ultimosQuatro) {
            spanDigitos.textContent = '*' + ultimosQuatro;
        }

        contentNovoCartao.classList.add('hidden');
        iconNovoCartao.className = "fa-solid fa-chevron-right text-lime-500 text-xs";
    });

    // Máscara Cartão (1234 5678...)
    inputNumeroCartao.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        valor = valor.substring(0, 16);
        const grupos = valor.match(/.{1,4}/g);
        e.target.value = grupos ? grupos.join(' ') : '';
    });

    // Máscara CVV (123 ou 1234)
    inputCVV.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        valor = valor.substring(0, 4);
        e.target.value = valor;
    });

    // Máscara Validade (MM/AA)
    inputValidade.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        valor = valor.substring(0, 4);
        if (valor.length > 2) {
            valor = valor.replace(/(\d{2})(\d{1,2})/, '$1/$2');
        }
        e.target.value = valor;
    });

    inputNome.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        e.target.value = valor;
    });

    const buscarEndereco = async (cep) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (!data.erro) {
                inputRua.value = data.logradouro;
                inputCidade.value = data.localidade;
                inputEstado.value = data.uf;
                inputNumEnd.focus();
            }

        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };
    inputCEP.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');
        valor = valor.substring(0, 8);
        const cepNumeros = valor;

        if (valor.length > 5) {
            valor = valor.replace(/(\d{5})(\d{1,3})/, '$1-$2');
        }

        e.target.value = valor;
        if (cepNumeros.length === 8) {
            buscarEndereco(cepNumeros);
        }
    });
    // Lógica do Botão de Realizar Pagamento
    btnRealizarPagamento.addEventListener('click', () => {
        // remove a invisibilidade e permite interação
        modalSenhaContainer.classList.remove('opacity-0', 'pointer-events-none', 'bg-opacity-0');
        modalSenhaContainer.classList.add('opacity-100', 'pointer-events-auto', 'bg-opacity-60');
    });
    btnModalContinuar.addEventListener('click', () => {
        // esconder com transição
        modalSenhaContainer.classList.add('opacity-0', 'pointer-events-none', 'bg-opacity-0');
        modalSenhaContainer.classList.remove('opacity-100', 'pointer-events-auto', 'bg-opacity-60');

        setTimeout(() => { window.location.href = 'sucesso-cartao.html'; }, 200);
    });
    const fecharModal = () => {
        modalSenhaContainer.classList.add('opacity-0', 'pointer-events-none', 'bg-opacity-0');
        modalSenhaContainer.classList.remove('opacity-100', 'pointer-events-auto', 'bg-opacity-60');
    };
    btnModalFecharBackdrop.addEventListener('click', fecharModal);
    btnModalFecharLink.addEventListener('click', fecharModal);

});