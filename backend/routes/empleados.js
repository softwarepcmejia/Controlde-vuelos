const express = require('express');
const router = express.Router();
const { crearEmpleado, obtenerEmpleados } = require('../controllers/empleadosController');

router.post('/', crearEmpleado);
router.get('/', obtenerEmpleados);

module.exports = router;
