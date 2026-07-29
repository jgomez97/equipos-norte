const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const navLinks = [...navMenu.querySelectorAll("a[href^='#']")];
const sections = [...document.querySelectorAll("main section[id]")];
const contactForm = document.getElementById("contactForm");
const whatsappNumber = "19152567670";

const closeMenu = () => {
  navMenu.classList.remove("open");
  menuButton.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menú");
  document.body.style.overflow = "";
};

menuButton.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuButton.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  document.body.style.overflow = isOpen ? "hidden" : "";
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const updateNavigation = () => {
  header.classList.toggle("scrolled", window.scrollY > 30);

  let currentId = "inicio";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 180) currentId = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};

window.addEventListener("scroll", updateNavigation, { passive: true });
updateNavigation();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();
  const text = `Hola, soy ${name}. Me interesa el servicio de ${service}.\n\n${message}`;

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

document.getElementById("year").textContent = new Date().getFullYear();
