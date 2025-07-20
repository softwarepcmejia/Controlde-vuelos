document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar-container");
  if (container) {
    // Detectar si estamos en una subcarpeta (como pages/)
    const isInSubfolder = window.location.pathname.includes("/pages/");

    const rutaNavbar = isInSubfolder
      ? "../components/navbar.html"
      : "components/navbar.html";

    fetch(rutaNavbar)
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;

        // Ajustar rutas del logo y enlaces si estás en una subcarpeta
        if (isInSubfolder) {
          const logo = container.querySelector("img.navbar-logo");
          if (logo) logo.src = "../assets/logo.png";

          const links = container.querySelectorAll("a.nav-link");
          links.forEach(link => {
            const href = link.getAttribute("href");
            if (href.startsWith("pages/")) {
              link.setAttribute("href", `../${href}`);
            } else if (href === "index.html") {
              link.setAttribute("href", "../index.html");
            }
          });
        }
      })
      .catch(err => console.error("Error cargando navbar:", err));
  }
});
