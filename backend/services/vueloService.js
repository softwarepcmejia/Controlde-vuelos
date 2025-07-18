const Vuelo = require('../models/vuelo');
const empleadoService = require('./empleadoService');
const { enviarCorreoVuelo } = require('../utils/email');

const crearVuelo = async ({
  empleadoId,
  tipo,
  fechaIda,
  fechaRegreso,
  origen,
  destino,
  observaciones
}) => {
  // Validación básica
  if (!empleadoId || !tipo || !fechaIda || !origen || !destino) {
    throw new Error('Faltan campos obligatorios');
  }

  if (fechaRegreso && new Date(fechaRegreso) < new Date(fechaIda)) {
    throw new Error('La fecha de regreso no puede ser anterior a la de ida');
  }

  // Obtener datos completos del empleado
  const empleado = await empleadoService.obtenerEmpleadoPorId(empleadoId);
  if (!empleado) {
    throw new Error('Empleado no encontrado');
  }

  // Guardar vuelo en la base de datos
  const nuevoVuelo = new Vuelo({
    empleadoId,
    tipo,
    fechaIda,
    fechaRegreso,
    origen,
    destino,
    observaciones
  });

  await nuevoVuelo.save();

  // Enviar correo al empleado
  await enviarCorreoVuelo(empleado, {
    tipo,
    fechaIda,
    fechaRegreso,
    origen,
    destino,
    observaciones
  });

  return nuevoVuelo;
};

module.exports = {
  crearVuelo
};
