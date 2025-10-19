// Espera o HTML ser totalmente carregado
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Puxar os Elementos ---
  const textoCodigo = document.getElementById('codigo-pix-texto');
  
  const btnAtualizar = document.getElementById('btn-atualizar-pix');
  const btnCopiar = document.getElementById('btn-copiar-pix');
  // O 'btnPagamentoFeito' foi removido


  // --- 2. Função para Gerar o PIX (APENAS A CHAVE) ---
  const gerarPix = () => {
    console.log("Gerando uma NOVA chave Pix...");
    // Gera uma chave aleatória "fake" (UUID)
    const chaveAleatoria = crypto.randomUUID(); 
    
    // 1. Coloca a chave no campo de texto
    textoCodigo.innerText = chaveAleatoria;
    
    // 2. Reseta o botão "Copiar"
    btnCopiar.innerText = "Copiar código";
    btnCopiar.classList.remove('bg-green-700', 'text-white');
    btnCopiar.classList.add('bg-lime-500', 'text-black');

    // 3. Guarda a chave e a data atual no localStorage
    const agora = new Date().getTime(); // Pega o timestamp atual
    localStorage.setItem('pixKey', chaveAleatoria);
    localStorage.setItem('pixTimestamp', agora);
  };
  
  // --- 3. Lógica dos Botões "Atualizar" e "Copiar" ---

  // Botão ATUALIZAR (Verifica o Pagamento)
  btnAtualizar.addEventListener('click', () => {
    // Simula a verificação e redireciona para o sucesso
    window.location.href = 'sucesso.html?metodo=pix';
  });

  // Botão COPIAR
  btnCopiar.addEventListener('click', () => {
    const texto = textoCodigo.innerText;

    navigator.clipboard.writeText(texto).then(() => {
      // Feedback visual
      btnCopiar.innerText = "Copiado com sucesso!";
      btnCopiar.classList.remove('bg-lime-500', 'text-black');
      btnCopiar.classList.add('bg-green-700', 'text-white'); 

      setTimeout(() => {
        if (btnCopiar.innerText === "Copiado com sucesso!") {
          btnCopiar.innerText = "Copiar código";
          btnCopiar.classList.remove('bg-green-700', 'text-white');
          btnCopiar.classList.add('bg-lime-500', 'text-black');
        }
      }, 2000);
    }).catch(err => {
      console.error('Falha ao copiar o código: ', err);
      alert("Não foi possível copiar o código.");
    });
  });


  // --- 4. Iniciar a Página (A LÓGICA DE 24 HORAS) ---
  
  const verificarChaveExistente = () => {
    const chaveGuardada = localStorage.getItem('pixKey');
    const dataGuardada = localStorage.getItem('pixTimestamp');
    const agora = new Date().getTime();
    
    const VINTE_E_QUATRO_HORAS_EM_MS = 24 * 60 * 60 * 1000;

    // Verifica se:
    // 1. Existe uma chave guardada
    // 2. Existe uma data guardada
    // 3. A data guardada NÃO expirou (agora - data < 24h)
    if (chaveGuardada && dataGuardada && (agora - dataGuardada < VINTE_E_QUATRO_HORAS_EM_MS)) {
      
      // A chave ainda é válida! Vamos usá-la.
      console.log("Usando chave Pix existente (ainda válida):", chaveGuardada);
      textoCodigo.innerText = chaveGuardada;

    } else {
      // Não há chave ou ela expirou. Geramos uma nova.
      gerarPix();
    }
  };
  
  // Executa a verificação assim que a página carrega
  verificarChaveExistente();

});