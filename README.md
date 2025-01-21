# TaskManager
Gestión de Tareas

TaskManager es una aplicación de gestión de tareas desarrollada con React Native (frontend) y Node.js (backend), utilizando una base de datos MySQL para almacenar la información.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [MySQL](https://www.mysql.com/) (v8.0 o superior)
- [HeidiSQL](https://www.heidisql.com/) (opcional, para gestionar la base de datos)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) (opcional, pero recomendado)

## Configuración del proyecto

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/BMchucoperez/TaskManager.git
cd TaskManager

2. Configurar la base de datos
Crear la base de datos:

Abre HeidiSQL (o cualquier cliente de MySQL) y crea una base de datos llamada taskmanager.

Crear la tabla tasks:

Ejecuta el siguiente comando SQL en HeidiSQL:

sql
Copy
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Configurar las variables de entorno:

En la carpeta server, crea un archivo .env y agrega las siguientes variables:

env
Copy
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=demo
DB_NAME=taskmanager
PORT=5001
Asegúrate de reemplazar los valores con los de tu configuración de MySQL.

3. Configurar el backend (server)
Instalar dependencias:

Navega a la carpeta server e instala las dependencias:

bash
Copy
cd server
npm install
Iniciar el servidor:

Una vez instaladas las dependencias, inicia el servidor:

bash
Copy
npm start
El servidor estará disponible en http://localhost:5001.

4. Configurar el frontend (src)
Instalar dependencias:

Navega a la carpeta src e instala las dependencias:

bash
Copy
cd ../src
npm install
Configurar la API:

Asegúrate de que la URL de la API en el archivo src/services/Api.ts apunte a la dirección del backend (http://localhost:5001).

Iniciar la aplicación:

Para ejecutar la aplicación en un emulador o dispositivo físico, usa el siguiente comando:

bash
Copy
npx react-native run-android
O si estás en iOS:

bash
Copy
npx react-native run-ios
Asegúrate de tener un emulador configurado o un dispositivo conectado.

5. Acceder a la aplicación
Una vez que el servidor y la aplicación estén en ejecución, podrás acceder a la aplicación desde tu emulador o dispositivo físico.

Estructura del proyecto
server/: Contiene el backend desarrollado con Node.js y Express.

controllers/: Lógica de los controladores.

models/: Modelos de la base de datos.

routes/: Rutas de la API.

db.js: Configuración de la conexión a la base de datos.

server.js: Punto de entrada del servidor.

src/: Contiene el frontend desarrollado con React Native.

components/: Componentes reutilizables.

screens/: Pantallas de la aplicación.

services/: Lógica para consumir la API.

context/: Contexto de React para manejar el estado global.
