document.addEventListener("DOMContentLoaded", () => {
  // Mascara do telefone
  const inputTelefone = document.getElementById("numeroTelefone");

  if (inputTelefone) {
    inputTelefone.addEventListener("input", (e) => {
      let valor = e.target.value.replace(/\D/g, ""); // remove tudo que não for número
      valor = valor.substring(0, 11); // limita a 11 dígitos (DDD + 9 números)

      if (valor.length > 2 && valor.length <= 6) {
        valor = valor.replace(/(\d{2})(\d+)/, "($1) $2");
      } else if (valor.length > 6) {
        valor = valor.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
      }

      e.target.value = valor;
    });
  }

  // -----------------------------
  // Máscara de Renda (formato R$ 1.234,56)
  // -----------------------------
  const inputRenda = document.querySelector('input[placeholder^="Ex: R$"]');

  if (inputRenda) {
    inputRenda.addEventListener("input", (e) => {
      // remove tudo que não for número
      let valor = e.target.value.replace(/\D/g, "");

      if (valor === "") {
        // mantém vazio para exibir o placeholder
        e.target.value = "";
        return;
      }

      // considera os dois últimos dígitos como centavos
      valor = (valor / 100).toFixed(2) + "";
      valor = valor.replace(".", ","); // troca ponto por vírgula

      // adiciona pontos a cada 3 dígitos antes da vírgula
      valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      e.target.value = "R$ " + valor;
    });
  }
});
