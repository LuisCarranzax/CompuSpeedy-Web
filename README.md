# CompuSpeedy-Web

## Finalidad del Proyecto

CompuSpeedy-Web es una aplicación web de soporte técnico. Su funcionalidad principal es presentar una interfaz atractiva a los usuarios y, en el backend, manejar las solicitudes de servicio enviadas desde el formulario de contacto. El servidor recibe los datos del cliente (nombre, correo, teléfono y problema) y envía automáticamente una notificación por correo electrónico utilizando **Nodemailer** y los servicios de Gmail.

## Estructura del Proyecto

- `public/`: Contiene todos los archivos estáticos del frontend (HTML, CSS, imágenes y scripts del cliente).
- `server.js`: Archivo principal del servidor. Configura el servidor web con Express y define la ruta de la API (`/api/contacto`) que procesa y envía los correos electrónicos.
- `package.json` / `package-lock.json`: Archivos de configuración de Node.js que contienen los metadatos del proyecto, scripts de ejecución y el registro de las librerías exactas utilizadas.
- `vercel.json`: Configuración específica para el despliegue del proyecto en la plataforma Vercel.
- `.gitignore`: Define los archivos y carpetas que se omiten en el repositorio (como la carpeta `node_modules` y el archivo `.env`).

## Librerías Utilizadas

El proyecto hace uso de las siguientes dependencias principales de Node.js:

- **express**: Framework para manejar la infraestructura del servidor web y las rutas (endpoints).
- **nodemailer**: Módulo para facilitar el envío de los correos electrónicos mediante SMTP.
- **dotenv**: Permite cargar variables de entorno desde un archivo `.env` para no exponer credenciales directamente en el código.
- **mysql2**: Cliente para realizar conexiones y consultas a una base de datos MySQL.
- **nodemon** _(Dependencia de desarrollo)_: Herramienta que monitorea los cambios en los archivos y reinicia automáticamente el servidor, facilitando el desarrollo.

## Comandos para Ejecutar el Proyecto

Si clonas este repositorio, debes seguir estos pasos para ejecutar el proyecto en tu entorno local:

1. **Instalar dependencias:**
   Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando para descargar las librerías:

   ```bash
   npm install
   ```

2. **Configurar las variables de entorno:**
   Crea un archivo llamado `.env` en la raíz del proyecto y agrega tus configuraciones (ver la sección de abajo).

3. **Ejecutar el servidor:**
   - Para modo normal:
     ```bash
     npm start
     ```
   - Para modo de desarrollo (se reinicia al guardar cambios):
     ```bash
     npm run dev
     ```

## Configuración del archivo `.env`

El archivo `.env` **no se encuentra incluido** en este repositorio por cuestiones de seguridad. Debes crearlo manualmente en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
EMAIL_USER=tu_correo@gmail.com
EMAIL_RECIPIENT=correo_que_recibe_las_solicitudes@gmail.com
EMAIL_PASS=tu_contrasena_de_aplicacion
```

### Detalles de las variables:

- `PORT`: El puerto en el cual correrá el servidor local (ej. 3000).
- `EMAIL_USER`: La dirección de correo electrónico desde la cual se enviarán los mensajes.
- `EMAIL_RECIPIENT`: El correo de destino (a quien le van a llegar las notificaciones de los clientes). _Nota: En tu código está definido como `EMAIL_RECIPIENT` (con "T" al final)._
- `EMAIL_PASS`: **Esta es la "contraseña de Google"** Ten en cuenta que **NO es tu contraseña normal de Gmail**. Para que funcione, debes generar una **"Contraseña de aplicación"** de 16 letras en los ajustes de seguridad de tu cuenta de Google (requiere tener activa la Verificación en 2 pasos).
