const express = require('express');
const router = express.Router();
const { crearEmpleado, obtenerEmpleados, actualizarEmpleado, eliminarEmpleado } = require('../controllers/empleadosController');

router.post('/', crearEmpleado);
router.get('/', obtenerEmpleados);
router.put('/:id', actualizarEmpleado);
router.delete('/:id', eliminarEmpleado);

module.exports = router;
