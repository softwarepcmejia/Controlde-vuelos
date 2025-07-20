document.addEventListener("DOMContentLoaded", async () => {
  const buscadorInput = document.getElementById("buscadorEmpleado");
  const sugerenciasList = document.getElementById("sugerenciasEmpleado");
  const inputEmpleadoId = document.getElementById("empleadoId");
  const form = document.getElementById("vueloForm");
  const mensaje = document.getElementById("mensaje");

  let empleados = [];

  function corregirZonaHoraria(fechaStr) {
    const fecha = new Date(fechaStr);
    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
    return fecha.toISOString();
  }

  // Cargar empleados al iniciar
  try {
    const res = await fetch(`${API_BASE}/api/empleados`);
    empleados = await res.json();
  } catch (err) {
    mensaje.innerHTML = '<div class="alert alert-danger">Error al cargar empleados</div>';
  }

  // Buscar y mostrar sugerencias al escribir
  buscadorInput.addEventListener("input", () => {
    const filtro = buscadorInput.value.toLowerCase();
    sugerenciasList.innerHTML = "";

    if (filtro.length === 0) return;

    const coincidencias = empleados.filter(emp =>
      emp.nombre.toLowerCase().includes(filtro) ||
      emp.cedula.toString().includes(filtro)
    );

    coincidencias.forEach(emp => {
      const item = document.createElement("li");
      item.className = "list-group-item list-group-item-action";
      item.textContent = `${emp.nombre} - ${emp.cedula}`;
      item.dataset.id = emp._id;

      // Selección por doble clic
      item.ondblclick = () => {
        buscadorInput.value = `${emp.nombre} - ${emp.cedula}`;
        inputEmpleadoId.value = emp._id;
        sugerenciasList.innerHTML = "";
      };

      sugerenciasList.appendChild(item);
    });
  });

  // Ocultar sugerencias al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!sugerenciasList.contains(e.target) && e.target !== buscadorInput) {
      sugerenciasList.innerHTML = "";
    }
  });

  // Guardar vuelo
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!inputEmpleadoId.value) {
      mensaje.innerHTML = `<div class="alert alert-danger">Debes seleccionar un empleado válido</div>`;
      return;
    }

    const data = {
      empleadoId: inputEmpleadoId.value,
      tipo: form.tipo.value,
      fechaIda: corregirZonaHoraria(form.fechaIda.value),
      fechaRegreso: form.fechaRegreso.value ? corregirZonaHoraria(form.fechaRegreso.value) : null,
      origen: form.origen.value,
      destino: form.destino.value,
      observaciones: form.observaciones.value
    };

    try {
      const res = await fetch(`${API_BASE}/api/vuelos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        mensaje.innerHTML = `<div class="alert alert-success">${result.mensaje}</div>`;
        form.reset();
        inputEmpleadoId.value = "";
        buscadorInput.value = "";
      } else {
        mensaje.innerHTML = `<div class="alert alert-danger">${result.error}</div>`;
      }
    } catch (err) {
      mensaje.innerHTML = `<div class="alert alert-danger">Error al guardar el vuelo</div>`;
    }
  });
});
