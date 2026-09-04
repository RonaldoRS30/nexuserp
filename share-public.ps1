# Publica NexusERP desde este PC con una URL temporal (Cloudflare Tunnel).
# Requisitos: Node.js, MySQL de XAMPP encendido, Internet.

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "=== NexusERP - URL publica ===" -ForegroundColor Cyan
Write-Host "Tu computadora servira el sitio. La URL dura mientras esta ventana este abierta." -ForegroundColor Yellow
Write-Host "El panel /admin tambien quedara visible. No uses la contrasena por defecto en un enlace que envies a mucha gente." -ForegroundColor Yellow
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js no esta instalado." -ForegroundColor Red
  exit 1
}

$mysql = "C:\xampp\mysql\bin\mysql.exe"
if (-not (Test-Path $mysql)) {
  Write-Host "No se encontro MySQL de XAMPP. Enciende MySQL en el panel de XAMPP." -ForegroundColor Red
  exit 1
}

try {
  & $mysql -u root -e "SELECT 1;" | Out-Null
} catch {
  Write-Host "MySQL no responde. Abre XAMPP y pulsa Start en MySQL." -ForegroundColor Red
  exit 1
}

if (-not (Test-Path ".\.env")) {
  Copy-Item ".\.env.example" ".\.env"
}

if (-not (Test-Path ".\node_modules")) {
  Write-Host "Instalando dependencias..." -ForegroundColor Cyan
  npm install
}

Write-Host "Preparando base de datos..." -ForegroundColor Cyan
npm run setup

Write-Host "Compilando el sitio..." -ForegroundColor Cyan
$env:VITE_API_URL = "/api"
npm run build:client

Write-Host "Iniciando servidor local en el puerto 4000..." -ForegroundColor Cyan
$env:SHARE_MODE = "1"
$env:NODE_ENV = "production"

function Stop-PortListener([int]$Port) {
  Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue |
    Where-Object { $_.State -eq "Listen" } |
    ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
}

Stop-PortListener 4000

$server = Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run start:share" -WorkingDirectory $PSScriptRoot -PassThru -WindowStyle Hidden

$ready = $false
for ($i = 0; $i -lt 30; $i++) {
  Start-Sleep -Seconds 1
  try {
    $health = Invoke-RestMethod -Uri "http://127.0.0.1:4000/api/health" -TimeoutSec 2
    if ($health.success) {
      $ready = $true
      break
    }
  } catch {
    # sigue esperando
  }
}

if (-not $ready) {
  Write-Host "El servidor no arranco. Revisa MySQL y vuelve a intentar." -ForegroundColor Red
  if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force }
  exit 1
}

Write-Host "Servidor listo. Creando URL publica..." -ForegroundColor Cyan
Write-Host "Cuando termines, pulsa Ctrl + C. El enlace se apaga al cerrar." -ForegroundColor Yellow
Write-Host ""

try {
  npx --yes cloudflared tunnel --url http://127.0.0.1:4000
} finally {
  Write-Host ""
  Write-Host "Cerrando servidor local..." -ForegroundColor Cyan
  if ($server -and -not $server.HasExited) {
    Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
  }
  Stop-PortListener 4000
}
