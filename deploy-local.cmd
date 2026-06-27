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

REM Change this to your server name or IP
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
echo ==========================================
echo.

cd /d "%SRC%" || exit /b 1

echo.
echo === Build locally ===
rmdir /s /q .next 2>nul
call npm run build || exit /b 1

echo.
echo === Stop remote service (%SERVICE%) ===
sc \\%SERVER% stop "%SERVICE%" >nul 2>nul
timeout /t 3 >nul

echo.
echo === Ensure remote destination exists ===
if not exist "%REMOTE_DST%" mkdir "%REMOTE_DST%"

echo.
echo === Copy standalone output to server ===
robocopy ".\.next\standalone" "%REMOTE_DST%" /MIR /XF web.config .env.production .env.development .env.local >nul
if %ERRORLEVEL% GEQ 8 exit /b 1

echo.
echo === Copy static assets to server ===
robocopy ".\.next\static" "%REMOTE_DST%\.next\static" /MIR >nul
if %ERRORLEVEL% GEQ 8 exit /b 1

echo.
echo === Copy public folder to server ===
robocopy ".\public" "%REMOTE_DST%\public" /MIR >nul
if %ERRORLEVEL% GEQ 8 exit /b 1

echo.
echo === Copy environment file ===
if exist "%SRC%\%ENVFILE%" (
  copy /Y "%SRC%\%ENVFILE%" "%REMOTE_DST%\%ENVFILE%" >nul

  REM Next standalone commonly expects production env at runtime.
  REM For dev target, also copy .env.development as .env.production unless your service handles NODE_ENV differently.
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
echo === Start remote service (%SERVICE%) ===
sc \\%SERVER% start "%SERVICE%" >nul 2>nul

echo.
echo === Wait for site ===
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
sc \\%SERVER% query "%SERVICE%"
exit /b 1