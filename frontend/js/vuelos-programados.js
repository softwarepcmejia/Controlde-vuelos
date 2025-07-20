document.addEventListener("DOMContentLoaded", async () => {
  const tabla = document.getElementById("tablaVuelos");
  const buscador = document.getElementById("buscador");

  let vuelos = [];

  try {
    const res = await fetch(`${API_BASE}/api/vuelos`);
    vuelos = await res.json();

    mostrarVuelos(vuelos);
  } catch (error) {
    tabla.innerHTML = `<tr><td colspan="7" class="text-danger text-center">Error al cargar los vuelos</td></tr>`;
    console.error(error);
  }

  // Filtrar al escribir
  buscador.addEventListener("input", () => {
    const filtro = buscador.value.toLowerCase();
    const filtrados = vuelos.filter(v =>
      v.empleadoId?.nombre?.toLowerCase().includes(filtro) ||
      v.empleadoId?.cedula?.toString().includes(filtro)
    );
    mostrarVuelos(filtrados);
  });

  function mostrarVuelos(lista) {
    tabla.innerHTML = "";

    if (lista.length === 0) {
      tabla.innerHTML = `<tr><td colspan="7" class="text-center">No hay vuelos para mostrar</td></tr>`;
      return;
    }

    lista.forEach(vuelo => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${vuelo.empleadoId?.nombre || "Desconocido"}</td>
        <td>${vuelo.empleadoId?.cedula || "N/A"}</td>
        <td>${vuelo.fechaIda ? new Date(vuelo.fechaIda).toLocaleDateString() : ""}</td>
        <td>${vuelo.fechaRegreso ? new Date(vuelo.fechaRegreso).toLocaleDateString() : "—"}</td>
        <td>${vuelo.origen} → ${vuelo.destino}</td>
        <td>${vuelo.estado || "Programado"}</td>
        <td>
          <button class="btn btn-sm btn-primary me-1" onclick="editarVuelo('${vuelo._id}')">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarVuelo('${vuelo._id}')">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
  }
});

// Función para redirigir al formulario de edición
function editarVuelo(id) {
  window.location.href = `../frontend/pages/editar-vuelo.html?id=${id}`;
}

// Función para eliminar vuelo con confirmación
async function eliminarVuelo(id) {
  const confirmar = confirm("¿Estás seguro de que deseas eliminar este vuelo?");
  if (!confirmar) return;

  try {
    const res = await fetch(`${API_BASE}/api/vuelos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar el vuelo");

    alert("Vuelo eliminado correctamente.");
    location.reload();
  } catch (error) {
    console.error(error);
    alert("Hubo un error al intentar eliminar el vuelo.");
  }
}
