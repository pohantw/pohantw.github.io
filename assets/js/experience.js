/**
 * Keeps the individual education/experience disclosures and the global
 * expand/collapse control in sync.
 */
(() => {
  "use strict";

  const toggleAll = document.querySelector(".career-toggle-all");
  const toggleLabel = toggleAll?.querySelector(".career-toggle-all__label");
  const detailsCards = [...document.querySelectorAll(".career-card__details")];

  if (!toggleAll || !detailsCards.length) return;

  function syncToggleState() {
    const allOpen = detailsCards.every((details) => details.open);

    toggleAll.setAttribute("aria-checked", String(allOpen));
    toggleAll.setAttribute(
      "aria-label",
      allOpen
        ? "Collapse all education and experience cards"
        : "Expand all education and experience cards",
    );

    if (toggleLabel) {
      toggleLabel.textContent = allOpen ? "Collapse all" : "Expand all";
    }
  }

  toggleAll.addEventListener("click", () => {
    const shouldOpen = !detailsCards.every((details) => details.open);

    detailsCards.forEach((details) => {
      details.open = shouldOpen;
    });

    syncToggleState();
  });

  detailsCards.forEach((details) => {
    details.addEventListener("toggle", syncToggleState);
  });

  syncToggleState();
})();
