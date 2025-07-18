const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cedula: { type: String, required: true },
  cargo: { type: String },
  fechaIngreso: { type: Date },
  telefono: { type: String },
  correo: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Correo no válido']
  },
  direccion: { type: String },
  genero: { type: String },
  nivelEducativo: { type: String },
  cursosCertificados: { type: String },
  estadoCivil: { type: String },
  nacionalidad: { type: String },
  tieneHijos: { type: Boolean },
  cantidadHijos: { type: Number },
  ciFiebreAmarilla: {
    type: String,
    enum: ['Vigente', 'No vigente']
  },
  foto: {
    type: String,
    enum: ['Sí', 'No']
  },
  fechaVacunacion: { type: Date },
  appCF: {
    type: String,
    enum: ['Sí', 'No']
  },
  codigoEmpleado: { type: String },
  contactoEmergencia: { type: String },
  udhl: {
    type: String,
    enum: ['Sí', 'No']
  }
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);
