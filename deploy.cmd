@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM ==========================================
REM Cerna Home Care Website - Production Deploy
REM ==========================================

REM Local project folder
set "SRC=C:\SourceCode\CERNA\www.cernahomecare.com"

REM Server details
set "SERVER=198.71.51.74"
set "SSH_PORT=2222"
set "SSH_USER=Administrator"
set "SSH_KEY=%USERPROFILE%\.ssh\cerna_deploy_key"

REM Production site only
set "REMOTE_DST=C:\inetpub\wwwroot\www.cernahomecare.com"
set "SERVICE=CernaHomeCareWeb"
set "ENVFILE=.env.production"
set "PORT=3020"
set "HEALTH_URL=https://www.cernahomecare.com"

set "PACKAGE=%SRC%\deploy-web-prod.zip"
set "REMOTE_ZIP=%REMOTE_DST%\deploy-web-prod.zip"

echo.
echo ==========================================
echo Deploying Cerna Home Care Website - PROD
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
if exist "%SRC%\.next" rmdir /s /q "%SRC%\.next"

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
echo Checking production environment file...
if not exist "%SRC%\%ENVFILE%" (
  echo ERROR: "%SRC%\%ENVFILE%" not found.
  echo This file should include required production values such as SAFEPATCH_API_KEY.
  exit /b 1
)

echo.
echo Checking production web config...
if not exist "%SRC%\web.production.config" (
  echo ERROR: "%SRC%\web.production.config" not found.
  exit /b 1
)

echo.
echo Removing old deploy zip...
if exist "%PACKAGE%" del /f /q "%PACKAGE%"

echo.
echo Creating deploy package...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; if (Test-Path 'deploy-package') { Remove-Item 'deploy-package' -Recurse -Force }; New-Item -ItemType Directory -Force 'deploy-package' | Out-Null; Copy-Item '.next\standalone\*' 'deploy-package' -Recurse -Force; New-Item -ItemType Directory -Force 'deploy-package\.next\static' | Out-Null; Copy-Item '.next\static\*' 'deploy-package\.next\static' -Recurse -Force; if (Test-Path 'public') { Copy-Item 'public' 'deploy-package\public' -Recurse -Force }; Copy-Item 'web.production.config' 'deploy-package\web.config' -Force; Copy-Item '%ENVFILE%' 'deploy-package\.env.production' -Force; Compress-Archive -Path 'deploy-package\*' -DestinationPath '%PACKAGE%' -Force; Remove-Item 'deploy-package' -Recurse -Force"

if errorlevel 1 exit /b 1  

echo.
echo Deploying on server with full clean folder reset...
ssh -i "%SSH_KEY%" -p %SSH_PORT% %SSH_USER%@%SERVER% "powershell -NoProfile -ExecutionPolicy Bypass -Command ""$ErrorActionPreference='Stop'; Stop-Service '%SERVICE%' -Force -ErrorAction SilentlyContinue; Start-Sleep -Seconds 5; if (Test-Path '%REMOTE_DST%') { Remove-Item '%REMOTE_DST%' -Recurse -Force -ErrorAction SilentlyContinue }; New-Item -ItemType Directory -Force '%REMOTE_DST%' | Out-Null;"""
if errorlevel 1 exit /b 1

echo.
echo Copying zip to clean server folder...
scp -i "%SSH_KEY%" -P %SSH_PORT% "%PACKAGE%" %SSH_USER%@%SERVER%:"%REMOTE_ZIP%"
if errorlevel 1 exit /b 1

echo.
echo Expanding package and restarting service...
ssh -i "%SSH_KEY%" -p %SSH_PORT% %SSH_USER%@%SERVER% "powershell -NoProfile -ExecutionPolicy Bypass -Command ""$ErrorActionPreference='Stop'; Expand-Archive -Path '%REMOTE_ZIP%' -DestinationPath '%REMOTE_DST%' -Force; Remove-Item '%REMOTE_ZIP%' -Force -ErrorAction SilentlyContinue; Start-Service '%SERVICE%'; Start-Sleep -Seconds 5; iisreset; Get-Service '%SERVICE%'; Get-Item '%REMOTE_DST%\server.js'; Get-Item '%REMOTE_DST%\web.config'; Get-Item '%REMOTE_DST%\.env.production'"""
if errorlevel 1 exit /b 1

echo.
echo Removing local deploy zip...
if exist "%PACKAGE%" del /f /q "%PACKAGE%"

echo.
echo Checking production site...
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r = Invoke-WebRequest '%HEALTH_URL%' -UseBasicParsing -TimeoutSec 30; Write-Host 'HTTP Status:' $r.StatusCode } catch { Write-Host 'Health check failed:' $_.Exception.Message; exit 1 }"
if errorlevel 1 exit /b 1

echo.
echo ==========================================
echo Production deploy complete.
echo ==========================================
echo.

endlocal