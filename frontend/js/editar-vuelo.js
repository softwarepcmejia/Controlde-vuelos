const urlParams = new URLSearchParams(window.location.search);
const vueloId = urlParams.get('id');

const form = document.getElementById('formEditarVuelo');
const empleadoInput = document.getElementById('empleado');
const tipoInput = document.getElementById('tipo');
const fechaIdaInput = document.getElementById('fechaIda');
const fechaRegresoInput = document.getElementById('fechaRegreso');
const origenInput = document.getElementById('origen');
const destinoInput = document.getElementById('destino');
const observacionesInput = document.getElementById('observaciones');
const estadoInput = document.getElementById('estado');

function corregirZonaHoraria(fechaStr) {
  const fecha = new Date(fechaStr);
  fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
  return fecha.toISOString();
}


document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch(`${API_BASE}/api/vuelos/${vueloId}`);
    if (!res.ok) throw new Error('Vuelo no encontrado');
    const vuelo = await res.json();

    empleadoInput.value = vuelo.empleadoId.nombre || 'Empleado';
    tipoInput.value = vuelo.tipo;
    fechaIdaInput.value = vuelo.fechaIda?.substring(0, 10);
    fechaRegresoInput.value = vuelo.fechaRegreso?.substring(0, 10) || '';
    origenInput.value = vuelo.origen;
    destinoInput.value = vuelo.destino;
    observacionesInput.value = vuelo.observaciones || '';
    estadoInput.value = vuelo.estado;
  } catch (err) {
    alert('Error al cargar el vuelo');
    console.error(err);
    window.location.href = '../index.html';
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const vueloActualizado = {
    tipo: tipoInput.value,
    fechaIda: corregirZonaHoraria(fechaIdaInput.value),
    fechaRegreso: fechaRegresoInput.value ? corregirZonaHoraria(fechaRegresoInput.value) : null,
    origen: origenInput.value,
    destino: destinoInput.value,
    observaciones: observacionesInput.value,
    estado: estadoInput.value
  };

  try {
    const res = await fetch(`${API_BASE}/api/vuelos/${vueloId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vueloActualizado)
    });

    if (!res.ok) throw new Error('Error al actualizar');

    alert('Vuelo actualizado correctamente');
    window.location.href = '../index.html';
  } catch (err) {
    alert('Error al actualizar vuelo');
    console.error(err);
  }
});
