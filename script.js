const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Interactive technology cards update the system console.
const detailConsole = document.querySelector("#detailConsole");
document.querySelectorAll(".system-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".system-card").forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    if (detailConsole) {
      detailConsole.innerHTML = `<span class="console-prompt">SYSTEM MESSAGE //</span>${card.dataset.detail}`;
    }
  });
});

// Reveal sections as they enter the viewport.
const revealTargets = document.querySelectorAll(
  ".section-heading, .panel, .system-card, .project-card, .contact-panel"
);
revealTargets.forEach((element) => element.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("visible"));
}

// Subtle cursor parallax for the AI core, disabled for reduced-motion preferences.
const visual = document.querySelector(".hero-visual");
const core = document.querySelector(".core");
if (visual && core && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  visual.addEventListener("pointermove", (event) => {
    const bounds = visual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    core.style.marginLeft = `${x * 12}px`;
    core.style.marginTop = `${y * 12}px`;
  });
  visual.addEventListener("pointerleave", () => {
    core.style.marginLeft = "0";
    core.style.marginTop = "0";
  });
}

// Footer toast gives a lightweight confirmation when the brand is clicked.
const toast = document.querySelector("#toast");
document.querySelectorAll(".brand").forEach((brand) => {
  brand.addEventListener("click", () => {
    if (!toast) return;
    toast.textContent = "SISTEMA GUQ // Bienvenido a mi portafolio.";
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2200);
  });
});
