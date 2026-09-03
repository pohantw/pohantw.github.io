const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");
const header = document.querySelector("[data-site-header]");
const navigationLinks = [...document.querySelectorAll('.primary-navigation a[href^="#"]')];
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
  if (
    menuButton?.getAttribute("aria-expanded") === "true" &&
    header &&
    !header.contains(event.target)
  ) {
    closeMenu();
  }
});

const desktopNavigation = window.matchMedia("(min-width: 56.01rem)");
desktopNavigation.addEventListener?.("change", (event) => {
  if (event.matches) closeMenu();
});

if ("IntersectionObserver" in window) {
  const visibleSections = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibleSections.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      });

      const activeSection = [...visibleSections.entries()]
        .filter(([, ratio]) => ratio > 0)
        .sort((a, b) => b[1] - a[1])[0]?.[0];

      navigationLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeSection}`;
        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-20% 0px -55% 0px",
      threshold: [0, 0.15, 0.4, 0.7],
    },
  );

  sections.forEach((section) => observer.observe(section));
}
