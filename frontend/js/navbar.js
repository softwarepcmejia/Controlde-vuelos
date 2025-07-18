document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar-container");
  if (container) {
    fetch("../components/navbar.html")
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;

        // Activar el enlace actual
        const currentPage = window.location.pathname.split("/").pop();
        const links = container.querySelectorAll("a.nav-link");

        links.forEach(link => {
          if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      })
      .catch(err => console.error("Error cargando navbar:", err));
  }
});
