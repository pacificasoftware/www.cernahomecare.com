@echo off
setlocal EnableExtensions

set "TARGET=%~1"

if "%TARGET%"=="" (
  echo.
  echo Usage:
  echo   deploy-local.cmd dev
  echo   deploy-local.cmd prod
  echo.
  exit /b 1
)

set "SRC=C:\SourceCode\CERNA\www.cernahomecare.com"
set "SERVER=198.71.51.74"

if /I "%TARGET%"=="prod" (
  set "REMOTE_DST=\\%SERVER%\c$\inetpub\wwwroot\www.cernahomecare.com"
  set "SERVICE=CernaHomeCareWeb"
  set "PORT=3020"
  set "ENVFILE=.env.production"
  set "HEALTH_URL=http://www.cernahomecare.com"
) else if /I "%TARGET%"=="dev" (
  set "REMOTE_DST=\\%SERVER%\c$\inetpub\wwwroot\dev.cernahomecare.com"
  set "SERVICE=CernaHomeCareWebDev"
  set "PORT=3021"
  set "ENVFILE=.env.development"
  set "HEALTH_URL=http://dev.cernahomecare.com"
) else (
  echo.
  echo ERROR: Invalid target "%TARGET%".
  echo Use:
  echo   deploy-local.cmd dev
  echo   deploy-local.cmd prod
  echo.
  exit /b 1
)

echo.
echo ==========================================
echo Local Deploy - Cerna Homecare
echo Target:       %TARGET%
echo Source:       %SRC%
echo Server:       %SERVER%
echo Destination:  %REMOTE_DST%
echo Service:      %SERVICE%
echo Port:         %PORT%
echo Env file:     %ENVFILE%
echo Health URL:   %HEALTH_URL%
echo ==========================================
echo.

cd /d "%SRC%" || exit /b 1

echo.
echo === Clean local build output ===
rmdir /s /q .next 2>nul

echo.
echo === Build locally ===
call npm run build
if errorlevel 1 (
  echo.
  echo ERROR: Build failed.
  exit /b 1
)

echo.
echo === Verify standalone output ===
if not exist ".\.next\standalone\server.js" (
  echo.
  echo ERROR: .next\standalone\server.js not found.
  echo Make sure next.config has output: "standalone".
  exit /b 1
)

echo.
echo === Stop remote service (%SERVICE%) ===
sc \\%SERVER% stop "%SERVICE%" >nul 2>nul

echo Waiting for service to stop...
for /l %%i in (1,1,20) do (
  sc \\%SERVER% query "%SERVICE%" | find /I "STOPPED" >nul && goto ServiceStopped
  timeout /t 1 >nul
)

:ServiceStopped
echo Service stop check complete.

echo.
echo === Ensure remote destination exists ===
if not exist "%REMOTE_DST%" mkdir "%REMOTE_DST%"

echo.
echo === Copy standalone output to server ===
robocopy ".\.next\standalone" "%REMOTE_DST%" /MIR /R:2 /W:2 /XF web.config .env.production .env.development .env.local
if %ERRORLEVEL% GEQ 8 (
  echo.
  echo ERROR: Failed copying standalone output.
  exit /b 1
)

echo.
echo === Copy static assets to server ===
if not exist "%REMOTE_DST%\.next" mkdir "%REMOTE_DST%\.next"

robocopy ".\.next\static" "%REMOTE_DST%\.next\static" /MIR /R:2 /W:2
if %ERRORLEVEL% GEQ 8 (
  echo.
  echo ERROR: Failed copying static assets.
  exit /b 1
)

echo.
echo === Copy public folder to server ===
robocopy ".\public" "%REMOTE_DST%\public" /MIR /R:2 /W:2
if %ERRORLEVEL% GEQ 8 (
  echo.
  echo ERROR: Failed copying public folder.
  exit /b 1
)

echo.
echo === Copy environment file ===
if exist "%SRC%\%ENVFILE%" (
  copy /Y "%SRC%\%ENVFILE%" "%REMOTE_DST%\%ENVFILE%" >nul

  if /I "%TARGET%"=="dev" (
    copy /Y "%SRC%\%ENVFILE%" "%REMOTE_DST%\.env.production" >nul
  )
) else (
  echo WARNING: "%SRC%\%ENVFILE%" not found. Skipping env file copy.
)

echo.
echo === Copy web.config ===
if not exist "%SRC%\web.config" (
  echo ERROR: "%SRC%\web.config" not found.
  exit /b 1
)

copy /Y "%SRC%\web.config" "%REMOTE_DST%\web.config" >nul

echo.
echo === Verify remote files ===
if not exist "%REMOTE_DST%\server.js" (
  echo.
  echo ERROR: server.js was not copied to remote destination.
  exit /b 1
)

if not exist "%REMOTE_DST%\.next\static" (
  echo.
  echo ERROR: .next\static was not copied to remote destination.
  exit /b 1
)

if not exist "%REMOTE_DST%\public" (
  echo.
  echo ERROR: public folder was not copied to remote destination.
  exit /b 1
)

echo.
echo === Start remote service (%SERVICE%) ===
sc \\%SERVER% start "%SERVICE%" >nul 2>nul

echo Waiting for service to start...
timeout /t 5 >nul

sc \\%SERVER% query "%SERVICE%"

echo.
echo === Health check ===
for /l %%i in (1,1,30) do (
  powershell -NoProfile -Command "try { (Invoke-WebRequest -UseBasicParsing '%HEALTH_URL%' -TimeoutSec 3).StatusCode } catch { 0 }" | find "200" >nul && (
    echo.
    echo Site is up: %HEALTH_URL%
    echo Deploy complete: %TARGET%
    exit /b 0
  )

  timeout /t 1 >nul
)

echo.
echo ERROR: Site did not respond successfully.
echo.
echo Service status:
sc \\%SERVER% query "%SERVICE%"

echo.
echo Remote folder contents:
dir "%REMOTE_DST%"

exit /b 1