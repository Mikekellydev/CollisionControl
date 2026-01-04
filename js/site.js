(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("siteNav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Theme switching: swap theme stylesheet href and store preference
  const themeLink = document.getElementById("themeStylesheet");
  const buttons = document.querySelectorAll("[data-theme]");
  const stored = localStorage.getItem("cccTheme");

  function applyTheme(name) {
    if (!themeLink) return;
    const safe = (name === "xmas") ? "xmas" : "orb";
    themeLink.setAttribute("href", `/css/theme.${safe}.css`);
    document.documentElement.dataset.theme = safe;
    localStorage.setItem("cccTheme", safe);
  }

  if (stored) applyTheme(stored);

  buttons.forEach(btn => {
    btn.addEventListener("click", () => applyTheme(btn.getAttribute("data-theme")));
  });

  // Contact form demo handler (replace with real endpoint)
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const ok = document.getElementById("formSuccess");
    const bad = document.getElementById("formError");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (ok) ok.hidden = true;
      if (bad) bad.hidden = true;

      // basic client-side check
      const required = form.querySelectorAll("[required]");
      let valid = true;
      required.forEach(el => {
        if (!el.value.trim()) valid = false;
      });

      if (!valid) {
        if (bad) {
          bad.hidden = false;
          bad.focus?.();
        }
        return;
      }

      // pretend success
      form.reset();
      if (ok) {
        ok.hidden = false;
        ok.focus?.();
      }
    });
  }
})();
