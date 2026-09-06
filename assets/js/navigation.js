/**
 * Handles the responsive navigation menu, in-page anchor restoration, and
 * active-section highlighting.
 */
(() => {
  "use strict";

  const menuButton = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  const header = document.querySelector("[data-site-header]");
  const navigationLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function closeMenu({ returnFocus = false } = {}) {
    if (!menuButton || !navigation) return;

    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");

    if (returnFocus) menuButton.focus();
  }

  function openMenu() {
    if (!menuButton || !navigation) return;

    menuButton.setAttribute("aria-expanded", "true");
    navigation.classList.add("is-open");
    document.body.classList.add("menu-open");
  }

  window.addEventListener(
    "load",
    () => {
      const targetId = window.location.hash.slice(1);
      const target = targetId && document.getElementById(targetId);
      target?.scrollIntoView({ behavior: "auto", block: "start" });
    },
    { once: true },
  );

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
      closeMenu({ returnFocus: true });
    }
  });

  document.addEventListener("click", (event) => {
    const menuIsOpen = menuButton?.getAttribute("aria-expanded") === "true";
    if (menuIsOpen && header && !header.contains(event.target)) closeMenu();
  });

  const desktopNavigation = window.matchMedia("(min-width: 47.51rem)");
  desktopNavigation.addEventListener?.("change", (event) => {
    if (event.matches) closeMenu();
  });

  if (!("IntersectionObserver" in window)) return;

  const visibility = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      const activeId = [...visibility.entries()]
        .filter(([, ratio]) => ratio > 0)
        .sort((a, b) => b[1] - a[1])[0]?.[0];

      navigationLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${activeId}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.4, 0.7] },
  );

  sections.forEach((section) => observer.observe(section));
})();
