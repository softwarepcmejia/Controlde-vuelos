const Vuelo = require('../models/vuelo');
const vueloService = require('../services/vueloService');

// Crear un nuevo vuelo
const crearVuelo = async (req, res) => {
  try {
    const nuevoVuelo = await vueloService.crearVuelo(req.body);
    res.status(201).json({
      mensaje: 'Vuelo registrado correctamente',
      vuelo: nuevoVuelo
    });
  } catch (error) {
    console.error('Error al guardar vuelo:', error.message);
    res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
};

// Obtener todos los vuelos
const obtenerVuelos = async (req, res) => {
  try {
    const vuelos = await Vuelo.find().populate('empleadoId', 'nombre cedula');
    res.status(200).json(vuelos);
  } catch (error) {
    console.error('Error al obtener vuelos:', error.message);
    res.status(500).json({ error: 'Error al obtener los vuelos' });
  }
};

// Obtener un vuelo por ID
const obtenerVueloPorId = async (req, res) => {
  try {
    const vuelo = await Vuelo.findById(req.params.id).populate('empleadoId', 'nombre cedula');
    if (!vuelo) return res.status(404).json({ error: 'Vuelo no encontrado' });
    res.status(200).json(vuelo);
  } catch (error) {
    console.error('Error al obtener vuelo por ID:', error.message);
    res.status(500).json({ error: 'Error al obtener el vuelo' });
  }
};

// Actualizar un vuelo por ID
const actualizarVuelo = async (req, res) => {
  try {
    const { tipo, fechaIda, fechaRegreso, origen, destino, observaciones } = req.body;

    const vuelo = await Vuelo.findByIdAndUpdate(
      req.params.id,
      { tipo, fechaIda, fechaRegreso, origen, destino, observaciones },
      { new: true }
    );

    if (!vuelo) return res.status(404).json({ error: 'Vuelo no encontrado para actualizar' });

    res.status(200).json({
      mensaje: 'Vuelo actualizado correctamente',
      vuelo
    });
  } catch (error) {
    console.error('Error al actualizar vuelo:', error.message);
    res.status(500).json({ error: 'Error al actualizar el vuelo' });
  }
};

const eliminarVuelo = async (req, res) => {
  try {
    const vueloEliminado = await Vuelo.findByIdAndDelete(req.params.id);

    if (!vueloEliminado) {
      return res.status(404).json({ error: 'Vuelo no encontrado para eliminar' });
    }

    res.status(200).json({ mensaje: 'Vuelo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar vuelo:', error.message);
    res.status(500).json({ error: 'Error al eliminar el vuelo' });
  }
};


module.exports = {
  crearVuelo,
  obtenerVuelos,
  obtenerVueloPorId,
  actualizarVuelo,
  eliminarVuelo // 
};
