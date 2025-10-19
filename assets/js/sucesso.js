// Espera o HTML ser totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
  const btnVoltar = document.getElementById('btn-voltar-menu');

  btnVoltar.addEventListener('click', () => {
    window.location.href = '../dist/index.html'; 
  });
  const spanData = document.getElementById('data-transacao');
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0');
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const ano = hoje.getFullYear();

  spanData.textContent = `${dia}/${mes}/${ano}`;

});