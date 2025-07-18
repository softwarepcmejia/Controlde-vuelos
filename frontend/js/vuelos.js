document.addEventListener("DOMContentLoaded", async () => {
  const empleadoSelect = document.getElementById("empleadoId");
  const form = document.getElementById("vueloForm");
  const mensaje = document.getElementById("mensaje");

  // Cargar empleados en el select
  try {
    const res = await fetch("http://localhost:4000/api/empleados");
    const empleados = await res.json();

    empleados.forEach(emp => {
      const option = document.createElement("option");
      option.value = emp._id;
      option.textContent = `${emp.nombre} - ${emp.cedula}`;
      empleadoSelect.appendChild(option);
    });
  } catch (err) {
    mensaje.innerHTML = '<div class="alert alert-danger">Error al cargar empleados</div>';
  }

  // Guardar vuelo
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      empleadoId: form.empleadoId.value,
      tipo: form.tipo.value,
      fechaIda: form.fechaIda.value,
      fechaRegreso: form.fechaRegreso.value || null,
      origen: form.origen.value,
      destino: form.destino.value,
      observaciones: form.observaciones.value
    };

    try {
      const res = await fetch("http://localhost:4000/api/vuelos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        mensaje.innerHTML = `<div class="alert alert-success">${result.mensaje}</div>`;
        form.reset();
      } else {
        mensaje.innerHTML = `<div class="alert alert-danger">${result.error}</div>`;
      }
    } catch (err) {
      mensaje.innerHTML = `<div class="alert alert-danger">Error al guardar el vuelo</div>`;
    }
  });
});
