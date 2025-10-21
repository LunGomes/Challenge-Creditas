document.addEventListener("DOMContentLoaded", () => {

  // -----------------------------
  // FUNÇÃO AUXILIAR: adicionar listener se elemento existir
  // -----------------------------
  const addListener = (selector, event, callback) => {
    const el = document.getElementById(selector);
    if (el) el.addEventListener(event, callback);
    return el; // retorna para uso posterior
  };

  // -----------------------------
  // FUNÇÃO AUXILIAR: aplicar máscara de CEP
  // -----------------------------
  const maskCEP = (input) => {
    input.addEventListener("input", (e) => {
      let valor = e.target.value.replace(/\D/g, "").substring(0, 8);
      if (valor.length > 5) valor = valor.replace(/(\d{5})(\d{1,3})/, "$1-$2");
      e.target.value = valor;

      // busca endereço se tiver 8 dígitos
      if (valor.replace("-", "").length === 8) {
        fetch(`https://viacep.com.br/ws/${valor.replace("-", "")}/json/`)
          .then(res => res.json())
          .then(data => {
            if (!data.erro) {
              const estado = document.getElementById("estado");
              const cidade = document.getElementById("cidade");
              const rua = document.getElementById("rua");
              const num_end = document.getElementById("num_end");
              if (estado) estado.value = data.uf;
              if (cidade) cidade.value = data.localidade;
              if (rua) rua.value = data.logradouro;
              if (num_end) num_end.focus();
            }
          })
          .catch(err => console.error("Erro ao buscar CEP:", err));
      }
    });
  };

  // -----------------------------
  // FUNÇÃO AUXILIAR: máscara telefone (99) 99999-9999
  // -----------------------------
  const maskTelefone = (input) => {
    input.addEventListener("input", (e) => {
      let valor = e.target.value.replace(/\D/g, "").substring(0, 11);
      if (valor.length > 2) valor = `(${valor.substring(0,2)}) ${valor.substring(2)}`;
      if (valor.length > 9) valor = `${valor.substring(0, 9)}-${valor.substring(9)}`;
      e.target.value = valor;
    });
  };

  // -----------------------------
  // FUNÇÃO AUXILIAR: máscara cartão
  // -----------------------------
  const maskCartao = (input) => {
    input.addEventListener("input", (e) => {
      let valor = e.target.value.replace(/\D/g, "").substring(0,16);
      const grupos = valor.match(/.{1,4}/g);
      e.target.value = grupos ? grupos.join(" ") : "";
    });
  };

  // -----------------------------
  // FUNÇÃO AUXILIAR: máscara CVV
  // -----------------------------
  const maskCVV = (input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").substring(0,4);
    });
  };

  // -----------------------------
  // FUNÇÃO AUXILIAR: máscara validade MM/AA
  // -----------------------------
  const maskValidade = (input) => {
    input.addEventListener("input", (e) => {
      let valor = e.target.value.replace(/\D/g, "").substring(0,4);
      if (valor.length > 2) valor = valor.replace(/(\d{2})(\d{1,2})/, "$1/$2");
      e.target.value = valor;
    });
  };

  // -----------------------------
  // FUNÇÃO AUXILIAR: validar nome (somente letras e espaço)
  // -----------------------------
  const maskNome = (input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    });
  };

  // -----------------------------
  // APLICAR MÁSCARAS
  // -----------------------------
  const inputCEP = document.getElementById("cep");
  if (inputCEP) maskCEP(inputCEP);

  const inputTelefone = document.getElementById("numeroTelefone");
  if (inputTelefone) maskTelefone(inputTelefone);

  const inputCartao = document.getElementById("numero");
  if (inputCartao) maskCartao(inputCartao);

  const inputCVV = document.getElementById("cvv");
  if (inputCVV) maskCVV(inputCVV);

  const inputValidade = document.getElementById("validade");
  if (inputValidade) maskValidade(inputValidade);

  const inputNome = document.getElementById("nome");
  if (inputNome) maskNome(inputNome);

  // -----------------------------
  // EVENTOS DE ACORDÉO (parcelas / novo cartão)
  // -----------------------------
  const btnParcelas = document.getElementById("btn-toggle-parcelas");
  const contentParcelas = document.getElementById("content-parcelas");
  const iconParcelas = document.getElementById("icon-parcelas");

  if (btnParcelas && contentParcelas && iconParcelas) {
    btnParcelas.addEventListener("click", () => {
      const estaFechado = contentParcelas.classList.contains("hidden");
      contentParcelas.classList.toggle("hidden");
      iconParcelas.className = estaFechado
        ? "fa-solid fa-chevron-down text-lime-500 text-xs"
        : "fa-solid fa-chevron-right text-lime-500 text-xs";
    });
  }

  const btnNovoCartao = document.getElementById("btn-toggle-novo-cartao");
  const contentNovoCartao = document.getElementById("content-novo-cartao");
  const iconNovoCartao = document.getElementById("icon-novo-cartao");

  if (btnNovoCartao && contentNovoCartao && iconNovoCartao) {
    btnNovoCartao.addEventListener("click", () => {
      const estaFechado = contentNovoCartao.classList.contains("hidden");
      contentNovoCartao.classList.toggle("hidden");
      iconNovoCartao.className = estaFechado
        ? "fa-solid fa-chevron-down text-lime-500 text-xs"
        : "fa-solid fa-chevron-right text-lime-500 text-xs";
    });
  }

  // -----------------------------
  // FORMULÁRIO NOVO CARTÃO
  // -----------------------------
  const formNovoCartao = document.getElementById("form-novo-cartao");
  const spanDigitos = document.getElementById("cartao-final-digitos");

  if (formNovoCartao) {
    formNovoCartao.addEventListener("submit", (e) => {
      e.preventDefault();
      const numeroCompleto = inputCartao ? inputCartao.value.replace(/\s/g,"") : "";
      const ultimosQuatro = numeroCompleto.slice(-4);
      if (spanDigitos && ultimosQuatro) spanDigitos.textContent = "*" + ultimosQuatro;
      if (contentNovoCartao) contentNovoCartao.classList.add("hidden");
      if (iconNovoCartao) iconNovoCartao.className = "fa-solid fa-chevron-right text-lime-500 text-xs";
    });
  }

  // -----------------------------
  // BOTÃO REALIZAR PAGAMENTO E MODAL
  // -----------------------------
  const btnRealizarPagamento = document.getElementById("btn-realizar-pagamento");
  const modalSenhaContainer = document.getElementById("modal-senha-container");
  const btnModalFecharBackdrop = document.getElementById("btn-modal-fechar-backdrop");
  const btnModalFecharLink = document.getElementById("btn-modal-fechar-link");
  const btnModalContinuar = document.getElementById("btn-modal-continuar");

  if (btnRealizarPagamento && modalSenhaContainer) {
    btnRealizarPagamento.addEventListener("click", () => {
      modalSenhaContainer.classList.remove("opacity-0", "pointer-events-none", "bg-opacity-0");
      modalSenhaContainer.classList.add("opacity-100", "pointer-events-auto", "bg-opacity-60");
    });
  }

  const fecharModal = () => {
    if (!modalSenhaContainer) return;
    modalSenhaContainer.classList.add("opacity-0", "pointer-events-none", "bg-opacity-0");
    modalSenhaContainer.classList.remove("opacity-100", "pointer-events-auto", "bg-opacity-60");
  };

  if (btnModalContinuar) {
    btnModalContinuar.addEventListener("click", () => {
      fecharModal();
      setTimeout(() => window.location.href = "sucesso-cartao.html", 200);
    });
  }

  if (btnModalFecharBackdrop) btnModalFecharBackdrop.addEventListener("click", fecharModal);
  if (btnModalFecharLink) btnModalFecharLink.addEventListener("click", fecharModal);

});
