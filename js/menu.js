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

const backdrop = document.querySelector("[data-modal]");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector("[data-modal-close]");

const tabletMedia = window.matchMedia("(min-width: 768px)");

function moveCloseButton(e) {
  if (e.matches) {
    // Планшет — переносимо кнопку в modal
    modal.prepend(closeBtn);
  } else {
    // Мобільна — повертаємо кнопку в backdrop
    backdrop.prepend(closeBtn);
  }
}

// Виконуємо одразу при завантаженні
moveCloseButton(tabletMedia);

// Слідкуємо за зміною розміру
tabletMedia.addEventListener("change", moveCloseButton);
