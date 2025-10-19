document.addEventListener('DOMContentLoaded', () => {
  const btnVoltar = document.getElementById('btn-voltar-menu');

  btnVoltar.addEventListener('click', () => {
    window.location.href = '../dist/index.html'; 
  });
});