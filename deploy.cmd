@echo off
setlocal EnableExtensions

set "TARGET=%~1"

if "%TARGET%"=="" (
  echo.
  echo Usage:
  echo   deploy.bat dev
  echo   deploy.bat prod
  echo.
  exit /b 1
)

set "SRC=C:\sourcecode\www.cernahomecare.com"

if /I "%TARGET%"=="prod" (
  set "DST=C:\inetpub\wwwroot\www.cernahomecare.com"
  set "SERVICE=CernaHomeCareWeb"
  set "PORT=3020"
  set "ENVFILE=.env.production"
  set "SITEURL=http://127.0.0.1:3020"
) else if /I "%TARGET%"=="dev" (
  set "DST=C:\inetpub\wwwroot\dev.cernahomecare.com"
  set "SERVICE=CernaHomeCareWebDev"
  set "PORT=3021"
  set "ENVFILE=.env.development"
  set "SITEURL=http://127.0.0.1:3021"
) else (
  echo.
  echo ERROR: Invalid target "%TARGET%".
  echo Use:
  echo   deploy.bat dev
  echo   deploy.bat prod
  echo.
  exit /b 1
)

echo.
echo ==========================================
echo Deploying Cerna Homecare Web
echo Target:  %TARGET%
echo Source:  %SRC%
echo Dest:    %DST%
echo Service: %SERVICE%
echo Port:    %PORT%
echo Env:     %ENVFILE%
echo ==========================================
echo.

cd /d "%SRC%" || exit /b 1

echo.
echo === Build ===
rmdir /s /q .next 2>nul
call npm run build || exit /b 1

echo.
echo === Stop Service (%SERVICE%) ===
sc stop "%SERVICE%" >nul 2>nul
timeout /t 2 >nul

echo.
echo === Ensure destination folder exists ===
if not exist "%DST%" mkdir "%DST%"

echo.
echo === Copy standalone output ===
robocopy ".\.next\standalone" "%DST%" /MIR /XF web.config .env.production .env.development .env.local >nul
if %ERRORLEVEL% GEQ 8 exit /b 1

echo.
echo === Copy static assets ===
robocopy ".\.next\static" "%DST%\.next\static" /MIR >nul
if %ERRORLEVEL% GEQ 8 exit /b 1

echo.
echo === Copy public folder ===
robocopy ".\public" "%DST%\public" /MIR >nul
if %ERRORLEVEL% GEQ 8 exit /b 1

echo.
echo === Copy environment file ===
if exist "%SRC%\%ENVFILE%" (
  copy /Y "%SRC%\%ENVFILE%" "%DST%\%ENVFILE%" >nul

  if /I not "%ENVFILE%"==".env.production" (
    copy /Y "%SRC%\%ENVFILE%" "%DST%\.env.production" >nul
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

copy /Y "%SRC%\web.config" "%DST%\web.config" >nul

echo.
echo === Start Service (%SERVICE%) ===
sc start "%SERVICE%" >nul 2>nul

echo.
echo === Wait for site on port %PORT% ===
for /l %%i in (1,1,30) do (
  powershell -NoProfile -Command "try { (Invoke-WebRequest -UseBasicParsing '%SITEURL%' -TimeoutSec 2).StatusCode } catch { 0 }" | find "200" >nul && (
    echo.
    echo Site is up on port %PORT%.
    echo Deploy complete: %TARGET%
    exit /b 0
  )
  timeout /t 1 >nul
)

echo.
echo ERROR: Site did not start on port %PORT%.
echo.
sc query "%SERVICE%"
exit /b 1