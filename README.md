# NexusERP

Sitio corporativo y panel administrativo para gestionar el contenido comercial de NexusERP: planes, módulos y consultas.

## Requisitos

- Node.js 20 o superior
- MySQL 8 (XAMPP o Docker)

## Configuración

1. Copie `.env.example` a `.env` y complete las credenciales.
2. Instale dependencias:

```bash
npm install
```

3. Cree la base de datos y los datos iniciales:

```bash
npm run db:init
npm run db:seed
```

4. Inicie frontend y backend:

```bash
npm run dev
```

- Sitio público: http://localhost:5173
- Panel: http://localhost:5173/admin
- API: http://localhost:4000/api/health

El usuario administrador inicial se crea con `ADMIN_EMAIL` y `ADMIN_PASSWORD` del archivo `.env`.

## Contacto público

`VITE_WHATSAPP_NUMBER`, `VITE_CONTACT_PHONE` y `VITE_CONTACT_EMAIL` controlan los datos visibles. Si un valor está vacío, no se muestra.

## Docker (MySQL opcional)

```bash
docker compose up -d
```

En `.env` use `DB_PORT=3307` y `DB_PASSWORD=nexuserp` si elige este contenedor.
