const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    match: [/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/, 'El nombre solo puede contener letras y espacios']
  },
  cedula: {
    type: String,
    required: [true, 'La cédula es obligatoria'],
    match: [/^\d+$/, 'La cédula debe contener solo números']
  },
  cargo: { type: String },
  fechaIngreso: { type: Date },
  telefono: {
    type: String,
    match: [/^\d+$/, 'El teléfono debe contener solo números'],
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    match: [/^\S+@\S+\.\S+$/, 'El formato del correo no es válido']
  },
  direccion: { type: String },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio'],
    enum: {
      values: ['Masculino', 'Femenino'],
      message: 'El género debe ser Masculino o Femenino'
    }
  },
  nivelEducativo: {
    type: String,
    enum: {
      values: ['Bachiller', 'Técnico', 'Tecnólogo', 'Profesional', 'Otros', ''],
      message: 'El nivel educativo no es válido'
    },
    default: ''
  },
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
  parentesco: {
    type: String,
    required: [true, 'El parentesco es obligatorio'],
    enum: {
      values: ['Conyuge', 'Padre', 'Madre', 'Hermano', 'Hermana', 'Hijo', 'Hija', 'Abuelo', 'Abuela', 'Amigo', 'Amiga', 'Otro'],
      message: 'Debe elegir un parentesco'
    }
  },
  numeroContacto: {
    type: String,
    match: [/^\d+$/, 'El teléfono debe contener solo números'],
  },
  udhl: {
    type: String,
    enum: ['Sí', 'No']
  }
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);
