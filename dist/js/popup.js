const btnComprovante = document.querySelector('.ml-auto img');
const popupDownload = document.getElementById('popup-download');
const btnFecharPopup = document.getElementById('btn-fechar-popup');

btnComprovante.addEventListener('click', () => {
  // Mostrar pop-up
  popupDownload.classList.remove('opacity-0', 'pointer-events-none');
  popupDownload.classList.add('opacity-100', 'pointer-events-auto');

  // Se quiser, pode fechar automaticamente após 2s
  setTimeout(() => {
    popupDownload.classList.add('opacity-0', 'pointer-events-none');
    popupDownload.classList.remove('opacity-100', 'pointer-events-auto');
  }, 5000);
});

btnFecharPopup.addEventListener('click', () => {
  // Fechar manualmente
  popupDownload.classList.add('opacity-0', 'pointer-events-none');
  popupDownload.classList.remove('opacity-100', 'pointer-events-auto');
});
