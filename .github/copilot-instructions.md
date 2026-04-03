# Residex - Instrucciones para Agentes de IA

## 📋 Visión General del Proyecto

**Residex** es una plataforma de gestión inteligente para unidades residenciales. Es un sistema fullstack que centraliza operaciones clave: control de visitantes, gestión de paquetería, pagos, PQRS, anuncios y reservas.

### Stack Tecnológico
- **Frontend**: Next.js (React)
- **Backend**: NestJS (Node.js)
- **Autenticación**: Amazon Cognito
- **Base de datos**: PostgreSQL (RDS)
- **Cloud**: AWS (API Gateway, S3, CloudFront)

## 🏗️ Arquitectura

```
Cliente (Next.js)
    ↓
API Gateway (AWS)
    ↓
NestJS Backend
    ↓
PostgreSQL + S3
```

### Módulos Principales
- **Visitantes**: Control de acceso y registro
- **Paquetería**: Gestión de entregas
- **Pagos**: Facturación y transacciones
- **PQRS**: Sistema de incidencias
- **Comunicación**: Anuncios y notificaciones
- **Zonas Comunes**: Reservas de espacios

## 🔑 Patrones y Convenciones

### Backend (NestJS)
- Estructura modular por features (visitors/, payments/, packages/)
- Controladores → Servicios → Repositorios
- DTOs para validación de entrada
- Guards para autenticación vía Cognito
- Excepciones tipadas (BadRequestException, UnauthorizedException)

### Frontend (Next.js)
- App Router (Next.js 13+)
- Server Components por defecto
- Client Components para interactividad (use 'use client')
- API Routes `/app/api/*` para endpoints backend

### Base de Datos (PostgreSQL)
- Migrations versionadas
- Relaciones entre usuarios, residencias, y servicios
- Índices en campos de búsqueda frecuente

## 🚀 Flujos de Desarrollo

### Setup Inicial
```bash
# Backend: instalar y ejecutar migraciones
cd backend && npm install && npm run typeorm:migration:run

# Frontend: instalar dependencias
cd frontend && npm install
```

### Desarrollo Local
```bash
# Backend: modo watch
cd backend && npm run start:dev

# Frontend: dev server
cd frontend && npm run dev
```

### Testing
```bash
# Backend: unit tests
npm run test

# Backend: e2e tests
npm run test:e2e
```

### Build & Deploy
```bash
# Frontend: build estático para CloudFront
npm run build

# Backend: build para Lambda/ECS
npm run build && npm run start:prod
```

## 🔐 Integración Cognito

- **Guards**: Validar JWT de Cognito en cada endpoint protegido
- **Contexto**: User ID disponible en `req.user` desde el guard
- **Tokens**: Access token para autorización, Refresh token para renovación

## 💾 Datos

- **Usuarios**: Sincronizar con Cognito (username, email)
- **Residencias**: Relación N:M entre usuarios y edificios
- **Auditoría**: Guardar `createdAt`, `updatedAt`, `createdBy` en tablas críticas

## ❌ Anti-patrones a Evitar

1. ❌ Guardar contraseñas en BD (usar Cognito)
2. ❌ Lógica directa en controladores (usar servicios)
3. ❌ Queries sin paginación en listados
4. ❌ Sin validación en endpoints públicos
5. ❌ Modificar directo el estado global sin rastro

## 📝 Convenciones de Código

- **Nombres**: camelCase (variables), PascalCase (clases/interfaces)
- **Archivos**: snake-case (controllers.ts, services.ts)
- **Imports**: Agrupa imports de 'nestjs', librerías, luego locales
- **Variables de entorno**: Usar dotenv, tipadas en config.service.ts

## 🔄 Integración AWS

- **API Gateway**: Rutas mapeadas a Lambda o ECS
- **S3**: Usado para documentos, perfiles, archivos PQRS
- **Cognito**: Punto centralizado de autenticación
- **CloudFront**: CDN para assets del frontend

## 📚 Referencias Clave

- `/backend` - Lógica de negocio NestJS
- `/frontend` - UI Next.js
- `/docs` - Documentación (arquitectura, guías)
- `/infra` - Configuración IaC (Terraform/CloudFormation)

---

**Última actualización**: Abril 2026  
**Mantenedor**: @sebasruizr05
