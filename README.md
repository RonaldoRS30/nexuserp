# NexusERP

Sitio corporativo y panel administrativo para gestionar planes, módulos y consultas.

## Arranque en local (Windows)

### Requisitos

- Node.js 20 o superior
- XAMPP con **MySQL encendido** (puerto 3306)

### Primera vez

En PowerShell, desde la carpeta del proyecto:

```powershell
cd C:\nexuserp
npm install
npm run setup
npm run dev
```

O un solo comando:

```powershell
cd C:\nexuserp
.\start-local.ps1
```

Si PowerShell bloquea el script:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
.\start-local.ps1
```

### Cada vez que quieras trabajar

1. Abre XAMPP y pulsa **Start** en MySQL.
2. En PowerShell:

```powershell
cd C:\nexuserp
npm run dev
```

### Dónde entra

| Qué | Dirección |
|---|---|
| Sitio público | http://localhost:5173 |
| Panel admin | http://localhost:5173/admin |
| API | http://localhost:4000/api/health |

Usuario inicial (está en `.env`):

- Correo: `admin@nexuserp.com`
- Contraseña: `NexusERP2026!`

### Contacto público

Teléfono y WhatsApp se editan en `/admin/configuracion`. Si WhatsApp está vacío, el botón anclado no aparece.

## Docker (MySQL opcional)

Si no usas XAMPP:

```bash
docker compose up -d
```

En `.env` pon `DB_PORT=3307` y `DB_PASSWORD=nexuserp`.
