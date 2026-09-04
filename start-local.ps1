# Arranque local de NexusERP (Windows + XAMPP MySQL)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "=== NexusERP - arranque local ===" -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js no esta instalado. Instala Node 20 o superior." -ForegroundColor Red
  exit 1
}

$mysql = "C:\xampp\mysql\bin\mysql.exe"
if (-not (Test-Path $mysql)) {
  Write-Host "No se encontro MySQL de XAMPP en C:\xampp\mysql\bin\mysql.exe" -ForegroundColor Red
  Write-Host "Abre XAMPP y enciende MySQL, o ajusta la ruta." -ForegroundColor Yellow
  exit 1
}

try {
  & $mysql -u root -e "SELECT 1;" | Out-Null
} catch {
  Write-Host "MySQL no responde. Abre el Panel de Control de XAMPP y pulsa Start en MySQL." -ForegroundColor Red
  exit 1
}

if (-not (Test-Path ".\.env")) {
  Copy-Item ".\.env.example" ".\.env"
  Write-Host "Se creo .env desde .env.example. Revisa ADMIN_PASSWORD antes de usarlo en produccion." -ForegroundColor Yellow
}

if (-not (Test-Path ".\node_modules")) {
  Write-Host "Instalando dependencias..." -ForegroundColor Cyan
  npm install
}

Write-Host "Preparando base de datos..." -ForegroundColor Cyan
npm run setup

Write-Host ""
Write-Host "Sitio:  http://localhost:5173" -ForegroundColor Green
Write-Host "Admin:  http://localhost:5173/admin" -ForegroundColor Green
Write-Host "API:    http://localhost:4000/api/health" -ForegroundColor Green
Write-Host "Usuario: el de ADMIN_EMAIL / ADMIN_PASSWORD en .env" -ForegroundColor Green
Write-Host ""
Write-Host "Para detener: Ctrl + C" -ForegroundColor Yellow
Write-Host ""

npm run dev
