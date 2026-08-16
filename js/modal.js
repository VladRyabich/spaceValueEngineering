(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    mobileEmail: document.querySelector("[data-mobile-modal]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
    menu: document.querySelector("[data-menu]"),
    form: document.querySelector("#form"),
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

  // Кастомні повідомлення валідації форми
  if (refs.form) {
    refs.form.addEventListener(
      "invalid",
      (event) => {
        const input = event.target;

        if (input.id === "user-name") {
          input.setCustomValidity("Please enter your name");
        }

        if (input.id === "user-email") {
          if (input.validity.valueMissing) {
            input.setCustomValidity("Please enter your email");
          } else if (input.validity.typeMismatch) {
            input.setCustomValidity("Please enter a valid email");
          }
        }

        if (input.id === "user-phone") {
          input.setCustomValidity("Please enter your phone number");
        }

        if (input.id === "user-comment") {
          input.setCustomValidity("Please enter your comment");
        }

        if (input.id === "privacy-policy") {
          input.setCustomValidity("Please accept the privacy policy");
        }
      },
      true
    );

    // При введенні тексту прибираємо попередню помилку
    refs.form.addEventListener("input", (event) => {
      event.target.setCustomValidity("");
    });

    // Для checkbox
    refs.form.addEventListener("change", (event) => {
      event.target.setCustomValidity("");
    });
  }

  function toggleModal() {
    refs.modal.classList.toggle("is_open");
  }
})();