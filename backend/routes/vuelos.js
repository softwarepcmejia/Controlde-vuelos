const express = require('express');
const router = express.Router();

const {
  crearVuelo,
  obtenerVuelos,
  obtenerVueloPorId,
  actualizarVuelo,
  eliminarVuelo
} = require('../controllers/vuelosController');

router.post('/', crearVuelo);
router.get('/', obtenerVuelos);
router.get('/:id', obtenerVueloPorId);
router.put('/:id', actualizarVuelo);
router.delete('/:id', eliminarVuelo);

module.exports = router;
