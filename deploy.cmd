@echo off
setlocal

set "SRC=C:\sourcecode\www.cernahomecare.com"
set "DST=C:\inetpub\wwwroot\www.cernahomecare.com"
set "SERVICE=CernaHomeCareWeb"
set "PORT=3020"

cd /d "%SRC%"

echo.
echo === Build ===
rmdir /s /q .next 2>nul
call npm run build || exit /b 1

echo.
echo === Stop Service (%SERVICE%) ===
sc stop %SERVICE% >nul 2>nul
timeout /t 2 >nul

echo.
echo === Copy standalone output ===
robocopy ".\.next\standalone" "%DST%" /MIR /XF web.config >nul
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
if exist ".env.production" copy /Y ".env.production" "%DST%\.env.production" >nul

echo.
echo === Copy web.config ===
if not exist "%SRC%\web.config" (
  echo ERROR: "%SRC%\web.config" not found.
  exit /b 1
)
copy /Y "%SRC%\web.config" "%DST%\web.config" >nul

echo.
echo === Start Service (%SERVICE%) ===
sc start %SERVICE% >nul 2>nul

echo.
echo === Wait for port %PORT% ===
for /l %%i in (1,1,30) do (
  powershell -NoProfile -Command "try { (Invoke-WebRequest -UseBasicParsing http://127.0.0.1:%PORT% -TimeoutSec 2).StatusCode } catch { 0 }" | find "200" >nul && (
    echo Site is up on port %PORT%.
    exit /b 0
  )
  timeout /t 1 >nul
)

echo ERROR: Site did not start on port %PORT%.
sc query %SERVICE%
exit /b 1