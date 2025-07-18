const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  }
});

// Plantilla HTML para vuelo
const generarHtmlVuelo = (empleado, vuelo) => {
  return `
    <p>Hola <b>${empleado.nombre}</b>,</p>
    <p>Se ha programado un vuelo para ti con la siguiente información:</p>
    <ul>
      <li><b>Tipo:</b> ${vuelo.tipo}</li>
      <li><b>Fecha de Ida:</b> ${vuelo.fechaIda}</li>
      <li><b>Fecha de Regreso:</b> ${vuelo.fechaRegreso || '—'}</li>
      <li><b>Origen:</b> ${vuelo.origen}</li>
      <li><b>Destino:</b> ${vuelo.destino}</li>
      <li><b>Observaciones:</b> ${vuelo.observaciones || 'Ninguna'}</li>
    </ul>
    <p><i>Este es un mensaje automático. Por favor no respondas.</i></p>
  `;
};

// Enviar correo real
const enviarCorreoVuelo = async (empleado, vuelo) => {
  if (!empleado?.correo || !empleado?.nombre) {
    console.warn('Correo no enviado: datos del empleado incompletos.');
    return;
  }

  if (!vuelo?.tipo || !vuelo?.fechaIda || !vuelo?.origen || !vuelo?.destino) {
    console.warn('Correo no enviado: datos del vuelo incompletos.');
    return;
  }

  const mailOptions = {
    from: `"Control de Vuelos Guyana" <${process.env.EMAIL_FROM}>`,
    to: empleado.correo,
    subject: 'Vuelo Programado',
    html: generarHtmlVuelo(empleado, vuelo)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado a', empleado.correo, '-', info.response);
  } catch (error) {
    console.error('Error al enviar correo:', error.message);
  }
};

module.exports = {
  enviarCorreoVuelo
};
