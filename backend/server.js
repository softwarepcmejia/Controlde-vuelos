const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const empleadosRoutes = require('./routes/empleados');
const vuelosRoutes = require('./routes/vuelos'); // NUEVO

dotenv.config({ path: __dirname + '/.env' });

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/empleados', empleadosRoutes);
app.use('/api/vuelos', vuelosRoutes); // NUEVO

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error en MongoDB:', err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//const { enviarCorreoPrueba } = require('./utils/email');
//enviarCorreoPrueba();
