(() => {
  const refs = {
    openMenuBtn: document.querySelector("[data-menu-open]"),
    closeMenuBtn: document.querySelector("[data-menu-close]"),
    menu: document.querySelector("[data-menu]"),
  };

  if (!refs.openMenuBtn || !refs.closeMenuBtn || !refs.menu) {
    return;
  }

  refs.openMenuBtn.addEventListener("click", toggleMenu);
  refs.closeMenuBtn.addEventListener("click", toggleMenu);

  function toggleMenu() {
    refs.menu.classList.toggle("is_open");
  }

  // Закриваємо меню при натисканні на посилання
  refs.menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      refs.menu.classList.remove("is_open");
    });
  });
})();