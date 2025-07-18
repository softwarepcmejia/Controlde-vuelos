const Empleado = require('../models/empleado');

const crearEmpleado = async (datosEmpleado) => {
  const nuevoEmpleado = new Empleado(datosEmpleado);
  await nuevoEmpleado.save();
  return nuevoEmpleado;
};

const obtenerEmpleados = async () => {
  const empleados = await Empleado.find();
  return empleados;
};

const obtenerEmpleadoPorId = async (id) => {
  const empleado = await Empleado.findById(id);
  return empleado;
};

module.exports = {
  crearEmpleado,
  obtenerEmpleados,
  obtenerEmpleadoPorId
};
