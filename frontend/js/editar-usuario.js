document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("empleadoForm");
  const mensaje = document.getElementById("mensaje");
  const urlParams = new URLSearchParams(window.location.search);
  const empleadoId = urlParams.get("id");

  if (!empleadoId) {
    mensaje.innerHTML = `<div class="alert alert-danger">ID de empleado no proporcionado.</div>`;
    return;
  }

  // Cargar datos del empleado
  try {
    const res = await fetch(`${API_BASE}/api/empleados`);
    const empleados = await res.json();
    const empleado = empleados.find(e => e._id === empleadoId);

    if (!empleado) throw new Error("Empleado no encontrado");

    // Llenar el formulario
    Object.keys(empleado).forEach(key => {
      const input = form.elements[key];
      if (input) {
        if (input.type === "select-one") {
          input.value = empleado[key]?.toString() || "";
        } else {
          input.value = empleado[key] || "";
        }
      }
    });
  } catch (err) {
    console.error("Error al cargar empleado:", err);
    mensaje.innerHTML = `<div class="alert alert-danger">Error al cargar datos del empleado</div>`;
  }

  // Guardar cambios
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datosActualizados = {};
    Array.from(form.elements).forEach(el => {
      if (el.name) {
        if (el.type === "select-one") {
          datosActualizados[el.name] = el.value === "true" ? true : el.value === "false" ? false : el.value;
        } else {
          datosActualizados[el.name] = el.value;
        }
      }
    });

    try {
      const res = await fetch(`${API_BASE}/api/empleados/${empleadoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados)
      });

      if (!res.ok) throw new Error("No se pudo actualizar el empleado");

      mensaje.innerHTML = `<div class="alert alert-success">Empleado actualizado correctamente.</div>`;
    } catch (err) {
      console.error("Error al actualizar empleado:", err);
      mensaje.innerHTML = `<div class="alert alert-danger">Error al actualizar el empleado</div>`;
    }
  });
});
