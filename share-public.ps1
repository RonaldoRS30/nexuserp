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

function Get-PortPids([int]$Port) {
  $pids = @()
  $lines = netstat -ano | Select-String ":$Port\s+.+LISTENING"
  foreach ($line in $lines) {
    $procId = ($line.ToString().Trim() -split '\s+')[-1]
    if ($procId -match '^\d+$' -and [int]$procId -gt 0) {
      $pids += [int]$procId
    }
  }
  return @($pids | Select-Object -Unique)
}

function Test-PortInUse([int]$Port) {
  return @(Get-PortPids $Port).Count -gt 0
}

function Find-FreePort([int]$StartPort) {
  for ($p = $StartPort; $p -le ($StartPort + 20); $p++) {
    if (-not (Test-PortInUse $p)) {
      return $p
    }
  }
  throw "No hay un puerto libre entre $StartPort y $($StartPort + 20)."
}

function Stop-PortListener([int]$Port) {
  foreach ($procId in (Get-PortPids $Port)) {
    Write-Host "Cerrando el servidor del puerto $Port (proceso $procId)..." -ForegroundColor Yellow
    Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
  }
}

$sharePort = Find-FreePort 4000
if ($sharePort -ne 4000) {
  Write-Host "El puerto 4000 ya esta en uso (por ejemplo npm run dev). Usando el $sharePort." -ForegroundColor Yellow
}

Write-Host "Iniciando servidor local en el puerto $sharePort..." -ForegroundColor Cyan
$env:SHARE_MODE = "1"
$env:NODE_ENV = "production"
$env:PORT = "$sharePort"

$logFile = Join-Path $PSScriptRoot "share-server.log"
$server = Start-Process -FilePath "cmd.exe" `
  -ArgumentList "/c npm run share:server > `"$logFile`" 2>&1" `
  -WorkingDirectory $PSScriptRoot `
  -PassThru `
  -WindowStyle Hidden

$ready = $false
for ($i = 1; $i -le 30; $i++) {
  Write-Host "Esperando al servidor... ($i/30)" -ForegroundColor DarkGray
  Start-Sleep -Seconds 1
  try {
    $health = Invoke-RestMethod -Uri "http://127.0.0.1:$sharePort/api/health" -TimeoutSec 2
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
  if (Test-Path $logFile) {
    Write-Host "Detalle:" -ForegroundColor Yellow
    Get-Content $logFile -ErrorAction SilentlyContinue
  }
  if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force }
  Stop-PortListener $sharePort
  exit 1
}

Write-Host "Servidor listo en el puerto $sharePort. Creando URL publica..." -ForegroundColor Cyan
Write-Host "Cuando termines, pulsa Ctrl + C. El enlace se apaga al cerrar." -ForegroundColor Yellow
Write-Host ""

try {
  npx --yes cloudflared tunnel --url "http://127.0.0.1:$sharePort"
} finally {
  Write-Host ""
  Write-Host "Cerrando servidor local..." -ForegroundColor Cyan
  if ($server -and -not $server.HasExited) {
    Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
  }
  Stop-PortListener $sharePort
}
