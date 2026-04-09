const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const { text } = require('stream/consumers');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

//Configuración de nodemailer para email.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.post('/api/contacto', async (req, res) =>{
    const {nombre, correo, telefono,problema} = req.body;

    const mailOptions = {
        from: `"Web Soporte Técnico" <${process.env.EMAIL_USER}>`,
        to: 'luiscqpeind@gmail.com', //Quien recibe el correo.
        subject: `Nueva solicitud de servicio de: ${nombre}`,
        text: `
            Has recibido una nueva solicitud desde la pagina web:
            CLIENTE: ${nombre}
            CORREO: ${correo}
            TELÉFONO: ${telefono}

            PROBLEMA REPORTADO:
            ${problema}
            `
    };
    try{

        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado existosamente - Cliente: ${nombre}`);

        res.status(200).json({
            mensaje: '!Mensaje enviado con éxito! Nos comunicaremos lo más pronto.'
        });
    }catch(error){
        console.log('Error al enviar el correo:', error);
        res.status(500).json({
            mensaje: 'Hubo un problema al procesar tu solicitud. Por favor, contáctanos por WhatsApp.'
        });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});