@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Bitte zuerst Node.js 24 von https://nodejs.org installieren.
  pause
  exit /b 1
)
if not exist "node_modules\vite\package.json" (
  echo Installiere Abhaengigkeiten. Beim ersten Start ist Internet erforderlich.
  call npm.cmd ci --no-audit --no-fund
  if errorlevel 1 (
    echo Installation fehlgeschlagen.
    pause
    exit /b 1
  )
)
node scripts\game.cjs start
if errorlevel 1 (
  pause
  exit /b 1
)
exit /b 0
