(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    mobileEmail: document.querySelector("[data-mobile-modal]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
    menu: document.querySelector("[data-menu]"),
  };

  // Кнопка відкриття модалки на планшеті та ПК
  if (refs.openModalBtn) {
    refs.openModalBtn.addEventListener("click", toggleModal);
  }

  // Email на мобільному
  if (refs.mobileEmail) {
    refs.mobileEmail.addEventListener("click", (event) => {
      if (window.innerWidth <= 767) {
        // Забороняємо mailto
        event.preventDefault();

        // Не даємо menu.js обробити цей клік
        event.stopPropagation();

        // Закриваємо мобільне меню
        if (refs.menu) {
          refs.menu.classList.remove("is_open");
        }

        // Відкриваємо модалку
        refs.modal.classList.add("is_open");
      }
    });
  }

  // Закриття модалки
  if (refs.closeModalBtn) {
    refs.closeModalBtn.addEventListener("click", toggleModal);
  }

  function toggleModal() {
    refs.modal.classList.toggle("is_open");
  }
})();