document.addEventListener("DOMContentLoaded", async () => {
  const tabla = document.getElementById("tablaUsuarios");

  try {
    const res = await fetch("http://localhost:4000/api/empleados");
    const empleados = await res.json();

    if (empleados.length === 0) {
      tabla.innerHTML = `<tr><td colspan="4" class="text-center">No hay usuarios registrados.</td></tr>`;
      return;
    }

    empleados.forEach(empleado => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${empleado.nombre}</td>
        <td>${empleado.cedula}</td>
        <td>${empleado.telefono}</td>
        <td>${empleado.udhl}</td>
      `;
      tabla.appendChild(fila);
    });
  } catch (err) {
    tabla.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error al cargar los usuarios</td></tr>`;
  }
});
