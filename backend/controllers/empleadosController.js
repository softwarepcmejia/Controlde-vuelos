const empleadoService = require('../services/empleadoService');

const crearEmpleado = async (req, res) => {
  try {
    await empleadoService.crearEmpleado(req.body);
    res.status(201).json({ mensaje: 'Empleado registrado correctamente' });
  } catch (error) {
    console.error('Error al guardar empleado:', error.message);
    res.status(500).json({ mensaje: 'Error al guardar el empleado' });
  }
};

const obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await empleadoService.obtenerEmpleados();
    res.json(empleados);
  } catch (error) {
    console.error('Error al obtener empleados:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener empleados' });
  }
};

module.exports = {
  crearEmpleado,
  obtenerEmpleados
};
