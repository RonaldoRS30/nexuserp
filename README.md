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

Teléfono, WhatsApp, Facebook e Instagram se editan en `/admin/configuracion`. Si un valor está vacío, no se muestra.

## Compartir el sitio con una URL pública

Tu PC puede servir el sitio y Cloudflare genera un enlace temporal (tipo `https://algo.trycloudflare.com`) para que otras personas lo vean.

1. Enciende **MySQL** en XAMPP.
2. En PowerShell:

```powershell
cd C:\nexuserp
.\share-public.ps1
```

3. En la consola aparecerá una URL `https://....trycloudflare.com`.
4. Compártela. El sitio y el admin quedan en esa misma dirección.
5. Para cortar el acceso: **Ctrl + C**. Si cierras la ventana o apagas la PC, el enlace deja de funcionar.

Esto no es un hosting permanente. Es un túnel mientras tu computadora esté encendida y el script corriendo.

O un alias:

```powershell
npm run share
```

## Docker (MySQL opcional)

Si no usas XAMPP:

```bash
docker compose up -d
```

En `.env` pon `DB_PORT=3307` y `DB_PASSWORD=nexuserp`.
