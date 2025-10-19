const btn = document.getElementById("dropdownBtn");
  const menu = document.getElementById("dropdownMenu");
  const icon = document.getElementById("chevronIcon");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  });

  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add("hidden");
      icon.classList.remove("fa-chevron-up");
      icon.classList.add("fa-chevron-down");
    }
  });