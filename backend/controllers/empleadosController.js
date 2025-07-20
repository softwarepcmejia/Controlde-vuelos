const empleadoService = require('../services/empleadoService');
const Empleado = require('../models/empleado');
const Vuelo = require('../models/vuelo');

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

const actualizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const empleado = await Empleado.findByIdAndUpdate(id, datosActualizados, { new: true });

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Empleado actualizado correctamente',
      empleado
    });
  } catch (error) {
    console.error('Error al actualizar empleado:', error.message);
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
};

const eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el empleado tiene vuelos asociados
    const vuelosAsociados = await Vuelo.find({ empleadoId: id });
    if (vuelosAsociados.length > 0) {
      return res.status(400).json({
        error: 'No se puede eliminar el empleado porque tiene vuelos registrados. Elimine primero los vuelos asociados.'
      });
    }

    const empleado = await Empleado.findByIdAndDelete(id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado para eliminar' });
    }

    res.status(200).json({ mensaje: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar empleado:', error.message);
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
};

module.exports = {
  crearEmpleado,
  obtenerEmpleados,
  actualizarEmpleado,
  eliminarEmpleado 
};
