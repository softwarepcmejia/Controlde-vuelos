document.getElementById("empleadoForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  data.tieneHijos = data.tieneHijos === 'true';

  try {
    const response = await fetch("http://localhost:4000/api/empleados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById("mensaje").innerHTML = `<div class="alert alert-success">${result.mensaje}</div>`;
    form.reset();
  } catch (err) {
    document.getElementById("mensaje").innerHTML = `<div class="alert alert-danger">Error al guardar</div>`;
  }
});
