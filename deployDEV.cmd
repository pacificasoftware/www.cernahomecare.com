@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM ==========================================
REM Cerna Home Care Website - DEV Deploy
REM ==========================================

set "SRC=C:\SourceCode\CERNA\www.cernahomecare.com"

set "SERVER=198.71.51.74"
set "SSH_PORT=2222"
set "SSH_USER=Administrator"
set "SSH_KEY=%USERPROFILE%\.ssh\cerna_deploy_key"

REM DEV site only
set "REMOTE_DST=C:\inetpub\wwwroot\dev.cernahomecare.com"
set "SERVICE=CernaHomeCareWebDev"
set "ENVFILE=.env.production"
set "PORT=3021"
set "HEALTH_URL=https://dev.cernahomecare.com"

set "PACKAGE=%SRC%\deploy-web-dev.zip"
set "REMOTE_ZIP=%REMOTE_DST%\deploy-web-dev.zip"

echo.
echo ==========================================
echo Deploying Cerna Home Care Website - DEV
echo Source:      %SRC%
echo Destination: %REMOTE_DST%
echo Service:     %SERVICE%
echo Port:        %PORT%
echo Env File:    %ENVFILE%
echo Health URL:  %HEALTH_URL%
echo ==========================================
echo.

cd /d "%SRC%" || exit /b 1

echo.
echo Installing dependencies...
call npm install
if errorlevel 1 exit /b 1

echo.
echo Removing old local build...
if exist "%SRC%\.next" (
  echo Stopping local Node processes that may lock .next...
  taskkill /F /IM node.exe >nul 2>&1

  echo Removing .next folder...
  rmdir /s /q "%SRC%\.next"

  if exist "%SRC%\.next" (
    echo ERROR: Could not remove .next folder.
    echo Close any running npm/Next.js dev servers and try again.
    exit /b 1
  )
)

echo.
echo Building Next.js app...
call npm run build
if errorlevel 1 exit /b 1

echo.
echo Checking standalone output...
if not exist "%SRC%\.next\standalone\server.js" (
  echo ERROR: .next\standalone\server.js not found.
  echo Make sure next.config has: output: "standalone"
  exit /b 1
)

echo.
echo Checking environment file...
if not exist "%SRC%\%ENVFILE%" (
  echo ERROR: "%SRC%\%ENVFILE%" not found.
  exit /b 1
)

echo.
echo Checking web config...
if not exist "%SRC%\web.config" (
  echo ERROR: "%SRC%\web.config" not found.
  exit /b 1
)

echo.
echo Removing old deploy zip...
if exist "%PACKAGE%" del /f /q "%PACKAGE%"

echo.
echo Creating deploy package...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; if (Test-Path 'deploy-package') { Remove-Item 'deploy-package' -Recurse -Force }; New-Item -ItemType Directory -Force 'deploy-package' | Out-Null; Copy-Item '.next\standalone\*' 'deploy-package' -Recurse -Force; New-Item -ItemType Directory -Force 'deploy-package\.next\static' | Out-Null; Copy-Item '.next\static\*' 'deploy-package\.next\static' -Recurse -Force; if (Test-Path 'public') { Copy-Item 'public' 'deploy-package\public' -Recurse -Force }; Copy-Item 'web.config' 'deploy-package\web.config' -Force; Copy-Item '%ENVFILE%' 'deploy-package\.env.production' -Force; Compress-Archive -Path 'deploy-package\*' -DestinationPath '%PACKAGE%' -Force; Remove-Item 'deploy-package' -Recurse -Force"
if errorlevel 1 exit /b 1

echo.
echo Deploying on DEV server with full clean folder reset...
ssh -i "%SSH_KEY%" -p %SSH_PORT% %SSH_USER%@%SERVER% "powershell -NoProfile -ExecutionPolicy Bypass -Command ""$ErrorActionPreference='Stop'; Stop-Service '%SERVICE%' -Force -ErrorAction SilentlyContinue; Start-Sleep -Seconds 5; if (Test-Path '%REMOTE_DST%') { Remove-Item '%REMOTE_DST%' -Recurse -Force -ErrorAction SilentlyContinue }; New-Item -ItemType Directory -Force '%REMOTE_DST%' | Out-Null;"""
if errorlevel 1 exit /b 1

echo.
echo Copying zip to DEV server folder...
scp -i "%SSH_KEY%" -P %SSH_PORT% "%PACKAGE%" %SSH_USER%@%SERVER%:"%REMOTE_ZIP%"
if errorlevel 1 exit /b 1

echo.
echo Expanding package and restarting DEV service...
ssh -i "%SSH_KEY%" -p %SSH_PORT% %SSH_USER%@%SERVER% "powershell -NoProfile -ExecutionPolicy Bypass -Command ""$ErrorActionPreference='Stop'; Expand-Archive -Path '%REMOTE_ZIP%' -DestinationPath '%REMOTE_DST%' -Force; Remove-Item '%REMOTE_ZIP%' -Force -ErrorAction SilentlyContinue; Start-Service '%SERVICE%'; Start-Sleep -Seconds 5; iisreset; Get-Service '%SERVICE%'; Get-Item '%REMOTE_DST%\server.js'; Get-Item '%REMOTE_DST%\web.config'; Get-Item '%REMOTE_DST%\.env.production'"""
if errorlevel 1 exit /b 1

echo.
echo Removing local deploy zip...
if exist "%PACKAGE%" del /f /q "%PACKAGE%"

echo.
echo Checking DEV site...
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r = Invoke-WebRequest '%HEALTH_URL%' -UseBasicParsing -TimeoutSec 30; Write-Host 'HTTP Status:' $r.StatusCode } catch { Write-Host 'Health check failed:' $_.Exception.Message; exit 1 }"
if errorlevel 1 exit /b 1

echo.
echo ==========================================
echo DEV deploy complete.
echo ==========================================
echo.

endlocal