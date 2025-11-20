# GraphQL API - Sistema de Gestión de Estudiantes

API GraphQL desarrollada con NestJS y PostgreSQL para la gestión de estudiantes y sus calificaciones. Incluye autenticación basada en JWT y control de roles.

## Producción

La aplicación está desplegada y disponible en:

**https://graph-api-kd2z.onrender.com/graphql**

## Descripción

Esta API proporciona un sistema completo para administrar estudiantes, sus calificaciones y la autenticación de usuarios. Utiliza GraphQL como lenguaje de consulta, permitiendo a los clientes solicitar exactamente los datos que necesitan.

### Características Principales

- **Gestión de Estudiantes**: CRUD completo para estudiantes con información personal y académica
- **Sistema de Calificaciones**: Registro y consulta de calificaciones por asignatura
- **Autenticación JWT**: Sistema seguro de registro e inicio de sesión
- **Control de Roles**: Protección de endpoints según roles de usuario
- **Paginación**: Consultas optimizadas con límite y offset
- **Seed de Datos**: Carga inicial de datos de prueba

## Tecnologías

- **NestJS**: Framework de Node.js para aplicaciones escalables
- **GraphQL**: Apollo Server para API GraphQL
- **TypeORM**: ORM para la gestión de base de datos
- **PostgreSQL**: Base de datos relacional
- **JWT**: Autenticación basada en tokens
- **TypeScript**: Tipado estático para mayor seguridad

## Estructura de la API

### Queries

- `students`: Obtener lista de estudiantes con paginación
- `student(term)`: Buscar estudiante por término
- `me`: Obtener información del usuario autenticado

### Mutations

- `register`: Registrar nuevo usuario
- `login`: Iniciar sesión
- `createStudent`: Crear nuevo estudiante
- `updateStudent`: Actualizar información de estudiante
- `removeStudent`: Eliminar estudiante
- `executeSeed`: Ejecutar seed de datos

### Tipos Principales

**Student**
- Información personal (nombre, edad, género, email)
- Lista de asignaturas
- Calificaciones por asignatura

**User**
- Datos de autenticación
- Roles y permisos
- Estado activo/inactivo

**Grade**
- Asignatura
- Calificación numérica
- Relación con estudiante

## Requisitos Previos

- Node.js 20.x
- PostgreSQL 14 o superior
- pnpm (recomendado) o npm

## Configuración

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd 2025-2-nest-graph
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nest_graph_db

JWT_SECRET=tu_secret_key_muy_segura

PORT=3000
```

### 4. Base de Datos con Docker

Iniciar PostgreSQL con Docker Compose:

```bash
docker-compose up -d
```

Esto creará un contenedor de PostgreSQL con las credenciales configuradas en el archivo `.env`.

## Ejecución

### Modo Desarrollo

```bash
pnpm run start:dev
```

La API estará disponible en: `http://localhost:3000/graphql`

### Modo Producción

```bash
# Compilar el proyecto
pnpm run build

# Ejecutar
pnpm run start:prod
```

### Modo Debug

```bash
pnpm run start:debug
```

## Seed de Datos

Para cargar datos de prueba en la base de datos, ejecutar la siguiente mutation en el playground de GraphQL:

```graphql
mutation {
  executeSeed
}
```

## Ejemplos de Uso

### Registro de Usuario

```graphql
mutation {
  register(createUserInput: {
    email: "usuario@example.com"
    fullName: "Usuario Ejemplo"
    password: "password123"
  }) {
    token
    user {
      id
      email
      fullName
      roles
    }
  }
}
```

### Login

```graphql
mutation {
  login(loginInput: {
    email: "usuario@example.com"
    password: "password123"
  }) {
    token
    user {
      id
      email
      fullName
    }
  }
}
```

### Consultar Estudiantes

```graphql
query {
  students(paginationArgs: { limit: 10, offset: 0 }) {
    id
    name
    email
    age
    gender
    subjects
    grade {
      subject
      grade
    }
  }
}
```

### Crear Estudiante

```graphql
mutation {
  createStudent(createStudentInput: {
    name: "Juan Pérez"
    email: "juan@example.com"
    gender: "M"
    age: 20
    subjects: ["Matemáticas", "Física", "Química"]
    grades: [
      { subject: "Matemáticas", grade: 4.5 }
      { subject: "Física", grade: 4.0 }
    ]
  }) {
    id
    name
    nickname
    grade {
      subject
      grade
    }
  }
}
```

## Testing

```bash
# Tests unitarios
pnpm run test

# Tests e2e
pnpm run test:e2e

# Cobertura de tests
pnpm run test:cov
```

## Linting y Formato

```bash
# Ejecutar linter
pnpm run lint

# Formatear código
pnpm run format
```

## Estructura del Proyecto

```
src/
├── auth/              # Módulo de autenticación
│   ├── decorators/    # Decoradores personalizados
│   ├── guards/        # Guards de protección
│   ├── strategies/    # Estrategias de autenticación
│   └── entities/      # Entidad User
├── students/          # Módulo de estudiantes
│   ├── dto/           # Input types y args
│   └── entities/      # Entidades Student y Grade
├── seed/              # Módulo de carga de datos
├── common/            # Recursos compartidos
└── main.ts            # Punto de entrada
```
