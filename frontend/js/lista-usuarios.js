document.addEventListener("DOMContentLoaded", async () => {
  const tabla = document.getElementById("tablaUsuarios");
  const buscador = document.getElementById("buscador");

  let empleados = [];

  // Función para renderizar empleados
  function renderTablaEmpleados(filtro = "") {
    tabla.innerHTML = "";

    const empleadosFiltrados = empleados.filter(emp =>
      emp.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      emp.cedula.toLowerCase().includes(filtro.toLowerCase())
    );

    if (empleadosFiltrados.length === 0) {
      tabla.innerHTML = `<tr><td colspan="7" class="text-center">No se encontraron empleados.</td></tr>`;
      return;
    }

    empleadosFiltrados.forEach(empleado => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${empleado.nombre}</td>
        <td>${empleado.cedula}</td>
        <td>${empleado.telefono || "-"}</td>
        <td>${empleado.correo || "-"}</td>
        <td>${empleado.cargo || "-"}</td>
        <td>${empleado.udhl || "-"}</td>
        <td>
          <button class="btn btn-sm btn-primary me-1" onclick="editarEmpleado('${empleado._id}')">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarEmpleado('${empleado._id}', '${empleado.nombre}')">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
  }

  // Obtener empleados al cargar
  try {
    const res = await fetch(`${API_BASE}/api/empleados`);
    empleados = await res.json();
    renderTablaEmpleados();
  } catch (err) {
    tabla.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error al cargar los usuarios</td></tr>`;
  }

  // Filtro dinámico
  buscador.addEventListener("input", e => {
    renderTablaEmpleados(e.target.value);
  });
});

// Editar empleado
function editarEmpleado(id) {
  window.location.href = `editar-usuario.html?id=${id}`;
}

// Eliminar empleado
async function eliminarEmpleado(id, nombre) {
  const confirmacion = confirm(`¿Estás seguro de eliminar a ${nombre}? Esta acción no se puede deshacer.`);
  if (!confirmacion) return;

  try {
    const res = await fetch(`${API_BASE}/api/empleados/${id}`, {
      method: "DELETE"
    });

    const resultado = await res.json();

    if (!res.ok) {
      alert(resultado.error || "Error al eliminar el empleado");
      return;
    }

    alert("Empleado eliminado correctamente");
    location.reload();
  } catch (err) {
    alert("Error al eliminar el empleado");
    console.error(err);
  }
}
