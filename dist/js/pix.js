document.addEventListener('DOMContentLoaded', () => {
  const textoCodigo = document.getElementById('codigo-pix-texto');
  const btnCopiar = document.getElementById('btn-copiar-pix');
  
  btnCopiar.addEventListener('click', () => {
    const texto = textoCodigo.innerText;

    navigator.clipboard.writeText(texto).then(() => {
      
      btnCopiar.innerText = "Copiado com sucesso!";
      btnCopiar.classList.remove('bg-verde-main', 'text-black');
      btnCopiar.classList.add('bg-verde-secundario', 'text-white'); 

      setTimeout(() => {
        if (btnCopiar.innerText === "Copiado com sucesso!") {
          btnCopiar.innerText = "Copiar código";
          btnCopiar.classList.remove('bg-verde-secundario', 'text-white');
          btnCopiar.classList.add('bg-verde-main', 'text-black');
        }
      }, 2000);
    }).catch(err => {
      console.error('Falha ao copiar o código: ', err);
      alert("Não foi possível copiar o código.");
    });
  });

});