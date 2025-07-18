const mongoose = require('mongoose');

const vueloSchema = new mongoose.Schema({
  empleadoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: true
  },
  tipo: {
    type: String,
    enum: ['ida', 'regreso'],
    required: true
  },
  fechaIda: {
    type: Date,
    required: true
  },
  fechaRegreso: {
    type: Date
  },
  origen: {
    type: String,
    enum: ['Colombia', 'Guyana'],
    required: true
  },
  destino: {
    type: String,
    enum: ['Colombia', 'Guyana'],
    required: true
  },
  observaciones: {
    type: String,
    default: ''
  },
  estado: {
    type: String,
    enum: ['Programado', 'Completado', 'Cancelado'],
    default: 'Programado'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vuelo', vueloSchema);
