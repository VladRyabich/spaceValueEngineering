(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    const iframes = document.querySelectorAll("iframe");

    iframes.forEach((iframe) => {
      if (!iframe.hasAttribute("loading")) {
        iframe.setAttribute("loading", "lazy");
      }

      if (!iframe.hasAttribute("fetchpriority")) {
        iframe.setAttribute("fetchpriority", "low");
      }
    });
  });

  if ("loading" in HTMLImageElement.prototype) {
    document.addEventListener("DOMContentLoaded", () => {
      const images = document.querySelectorAll("img");

      images.forEach((img) => {
        // Не змінюємо hero images — вони потрібні одразу
        if (
          !img.classList.contains("comparison__image--after") &&
          !img.classList.contains("comparison__image--before")
        ) {
          img.loading = "lazy";
          img.decoding = "async";
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img");

    images.forEach((img) => {
      img.decoding = "async";
    });
  });

  window.addEventListener("load", () => {
    const links = document.querySelectorAll(
      'link[rel="stylesheet"][data-defer]',
    );

    links.forEach((link) => {
      link.media = "all";
    });
  });

  const prefetchPage = (href) => {
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return;
    }

    if (href.startsWith("http") && !href.includes(location.hostname)) {
      return;
    }

    const existing = document.querySelector(
      `link[rel="prefetch"][href="${href}"]`,
    );

    if (existing) return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;

    document.head.appendChild(link);
  };

  window.addEventListener("load", () => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        document
          .querySelectorAll("a[href]")
          .forEach((link) => prefetchPage(link.href));
      });
    }
  });

  window.addEventListener("load", () => {
    document.documentElement.classList.add("page-loaded");
  });
})();
