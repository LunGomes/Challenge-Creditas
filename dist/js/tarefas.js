document.addEventListener("DOMContentLoaded", () => {

  // Mascara do telefone  
  const inputTelefone = document.getElementById("numeroTelefone");

  inputTelefone.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // remove tudo que não for número
    valor = valor.substring(0, 11); // limita a 11 dígitos (DDD + 9 números)

    if (valor.length > 2 && valor.length <= 6) {
      // Aplica parênteses no DDD
      valor = valor.replace(/(\d{2})(\d+)/, "($1) $2");
    } else if (valor.length > 6) {
      // Aplica parênteses no DDD e traço após o 7º dígito
      valor = valor.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
    }

    e.target.value = valor;
  });
  // Fim Mascara do telefone  
  
});