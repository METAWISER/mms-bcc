# MMS Order Management System

## Descripción General
MMS Order Management System es una aplicación backend diseñada para la gestión eficiente de órdenes en un sistema de tiendas en línea. Esta aplicación permite a los usuarios crear, asignar, y actualizar el estado de las órdenes, proporcionando una estructura clara para la administración tanto de clientes como empleados. La API se ha construido utilizando NestJS y GraphQL, lo que facilita la comunicación flexible y segura entre los componentes del sistema. La base de datos utilizada es MongoDB, que proporciona escalabilidad y flexibilidad para manejar los datos relacionados con usuarios, productos y órdenes.

## Tecnologías Usadas
- <img src="https://nestjs.com/img/logo_text.svg" alt="NestJS" width="20" height="20" /> **Framework Backend**: NestJS
- <img src="https://graphql.org/img/logo.svg" alt="GraphQL" width="20" height="20" /> **API**: GraphQL
- <img src="https://www.mongodb.com/assets/images/global/favicon.ico" alt="MongoDB" width="20" height="20" /> **Base de Datos**: MongoDB
- **Librerías**:
  - **Autenticación y Autorización**: Passport, JWT
  - **Validación de Datos**: class-validator
  - **Encriptación**: bcrypt
  - **Otros**: Apollo Server, Mongoose, rxjs, UUID

## Requisitos Previos
Para correr la aplicación en un entorno local necesitarás tener instalados los siguientes elementos:

- <img src="https://nodejs.org/static/images/favicons/favicon.png" alt="Node.js" width="20" height="20" /> **Node.js** (versión 16 o superior)
- <img src="https://nodejs.org/static/images/favicons/favicon.png" alt="npm" width="20" height="20" /> **npm** (normalmente viene con Node.js)
- <img src="https://www.docker.com/favicon.ico" alt="Docker" width="20" height="20" /> **Docker** (para ejecutar la aplicación y la base de datos con contenedores Docker)
- <img src="https://www.mongodb.com/assets/images/global/favicon.ico" alt="MongoDB" width="20" height="20" /> **MongoDB** (puede ser una instancia local o Dockerizada)

## Instalación

### Clonación del Repositorio
1. Clonar el repositorio a tu máquina local:
   ```sh
   git clone https://github.com/METAWISER/mms-bcc.git
   cd mms-order-management-system
   ```
2. Instalar las dependencias:
   ```sh
   npm install
   ```

### Ejecución con Docker
1. Construir la imagen Docker:
   ```sh
   docker build -t mms-order-management-system .
   ```
2. Ejecutar la aplicación con Docker:
   ```sh
   docker run -p 3000:3000 --env-file .env mms-order-management-system
   ```
   Asegúrate de tener un archivo `.env` en la raíz del proyecto (puedes utilizar el `.env.template` como referencia).

### Ejecución desde DockerHub
1. Descargar la imagen desde DockerHub:
   ```sh
   docker pull metawiser/order-management-system-app:latest
   ```
2. Ejecutar la aplicación con Docker:
   ```sh
   docker run -p 3000:3000 --env-file .env metawiser/order-management-system-app:latest
   ```

## Configuración del Entorno
- Hay un archivo `.env.template` que contiene todas las variables de entorno necesarias. Debes crear un archivo `.env` basado en este template y configurarlo con los valores correspondientes para tu entorno.
- Variables más importantes:
  - `MONGO_URI`: URI de conexión a la base de datos MongoDB.
  - `JWT_SECRET`: Clave secreta utilizada para firmar los tokens de autenticación.

## Autenticación y Autorización
MMS Order Management System utiliza **JWT** para la autenticación de usuarios. Los tokens se generan al momento del inicio de sesión y se utilizan para proteger las rutas de la API.

La aplicación tiene tres roles principales: **Cliente**, **Empleado** y **Administrador**. Cada rol tiene diferentes permisos:
- **Cliente**: puede crear órdenes.
- **Empleado**: puede asignarse a una orden y cambiar el estado de una orden.
- **Administrador**: puede gestionar todos los usuarios y órdenes, incluyendo la creación, asignación y eliminación de usuarios.

## Documentación de la API GraphQL
Puedes explorar la API utilizando **Apollo Sandbox** accediendo a `/graphql` en el navegador. Aquí se encuentran disponibles todos los esquemas y mutaciones para interactuar con la aplicación.

Ejemplos de consultas:
```graphql
query Orders {
  orders {
    _id
    assignedEmployee {
      _id
    }
    createdAt
    products
    status
    total
    updatedAt
    user {
      _id
    }
  }
}
```
Ejemplo de mutación:
```graphql
mutation {
  createOrder(createOrderInput: $createOrderInput) {
    _id
    products
    status
    total
    user {
      _id
    }
  }
}
```

## Scripts Disponibles
Los scripts disponibles están definidos en el archivo `package.json`:

- **`npm run build`**: Construye la aplicación para producción.
- **`npm run start`**: Inicia la aplicación en modo producción.
- **`npm run start:dev`**: Inicia la aplicación en modo desarrollo con recarga automática.
- **`npm run start:prod`**: Ejecuta el código compilado en `dist`.
- **`npm run test`**: Ejecuta todas las pruebas unitarias.
- **`npm run test:e2e`**: Ejecuta pruebas end-to-end.
- **`npm run lint`**: Analiza el código para buscar y arreglar problemas de estilo.

## Pruebas
La aplicación incluye pruebas unitarias y end-to-end (e2e) utilizando **Jest**. Para ejecutar estas pruebas:

- Pruebas unitarias: `npm run test`
- Pruebas end-to-end: `npm run test:e2e`
- Cobertura de pruebas: `npm run test:cov`

Estas pruebas aseguran que todas las funcionalidades principales estén correctamente implementadas y que el sistema se comporte como se espera en diferentes escenarios.

