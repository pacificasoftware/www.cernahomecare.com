@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM ==========================================
REM Cerna Home Care Website - PRODUCTION Deploy
REM ==========================================

REM Local project folder
set "SRC=C:\SourceCode\CERNA_HEALTH_CARE\CERNA_HOME_CARE\www.cernahomecare.com"

REM Server connection
set "SERVER=198.71.51.74"
set "SSH_PORT=2222"
set "SSH_USER=Administrator"
set "SSH_KEY=%USERPROFILE%\.ssh\cerna_deploy_key"

REM Production site
set "REMOTE_DST=C:\inetpub\wwwroot\www.cernahomecare.com"
set "SERVICE=CernaHomeCareWeb"
set "ENVFILE=.env.production"
set "PORT=3020"
set "HEALTH_URL=https://www.cernahomecare.com"

REM Deployment package
set "PACKAGE=%SRC%\deploy-web-production.zip"

REM Short staging path prevents Windows long-path problems
set "STAGING=C:\CernaDeployTemp"

REM Upload to Administrator SSH home folder first
set "REMOTE_UPLOAD=deploy-web-production.zip"


echo.
echo ==========================================
echo Cerna Home Care Website
echo PRODUCTION DEPLOYMENT
echo ==========================================
echo Source:       %SRC%
echo Destination:  %REMOTE_DST%
echo Service:      %SERVICE%
echo Port:         %PORT%
echo Env File:     %ENVFILE%
echo Health URL:   %HEALTH_URL%
echo Staging:      %STAGING%
echo ==========================================
echo.

echo WARNING:
echo This will replace the current PRODUCTION website.
echo.

set /p CONFIRM=Type DEPLOY to continue: 

if /I not "%CONFIRM%"=="DEPLOY" (
    echo.
    echo Production deployment cancelled.
    exit /b 0
)

echo.
echo Starting production deployment...
echo.


REM ==========================================
REM Open source directory
REM ==========================================

cd /d "%SRC%"

if errorlevel 1 (
    echo ERROR: Could not open source folder:
    echo %SRC%
    exit /b 1
)


REM ==========================================
REM Validate required files
REM ==========================================

echo.
echo Checking SSH key...

if not exist "%SSH_KEY%" (
    echo ERROR: SSH key not found:
    echo %SSH_KEY%
    exit /b 1
)


echo.
echo Checking environment file...

if not exist "%SRC%\%ENVFILE%" (
    echo ERROR: Environment file not found:
    echo %SRC%\%ENVFILE%
    exit /b 1
)


echo.
echo Checking web.config...

if not exist "%SRC%\web.config" (
    echo ERROR: web.config not found:
    echo %SRC%\web.config
    exit /b 1
)


echo.
echo Checking package.json...

if not exist "%SRC%\package.json" (
    echo ERROR: package.json not found:
    echo %SRC%\package.json
    exit /b 1
)


REM ==========================================
REM Install dependencies
REM ==========================================

echo.
echo Installing dependencies...

call npm install

if errorlevel 1 (
    echo ERROR: npm install failed.
    exit /b 1
)


REM ==========================================
REM Stop local Node processes
REM ==========================================

echo.
echo Stopping local Node processes that may lock .next...

taskkill /F /IM node.exe >nul 2>&1


REM ==========================================
REM Remove old Next.js build
REM ==========================================

echo.
echo Removing old local build...

if exist "%SRC%\.next" (
    rmdir /s /q "%SRC%\.next"
)

if exist "%SRC%\.next" (
    echo ERROR: Could not remove the .next folder.
    echo Close any running Next.js or Node processes and try again.
    exit /b 1
)


REM ==========================================
REM Build production application
REM ==========================================

echo.
echo Building production Next.js application...

call npm run build

if errorlevel 1 (
    echo ERROR: Production build failed.
    exit /b 1
)


REM ==========================================
REM Verify standalone output
REM ==========================================

echo.
echo Checking standalone output...

if not exist "%SRC%\.next\standalone\server.js" (
    echo ERROR: .next\standalone\server.js was not created.
    echo.
    echo Make sure next.config contains:
    echo output: "standalone"
    exit /b 1
)


REM ==========================================
REM Remove old deployment files
REM ==========================================

echo.
echo Removing old local deployment files...

if exist "%PACKAGE%" (
    del /f /q "%PACKAGE%"
)

if exist "%STAGING%" (
    rmdir /s /q "%STAGING%"
)

if exist "%STAGING%" (
    echo ERROR: Could not remove old staging folder:
    echo %STAGING%
    exit /b 1
)


REM ==========================================
REM Create short staging directory
REM ==========================================

echo.
echo Creating deployment staging folder...
echo %STAGING%

mkdir "%STAGING%"

if errorlevel 1 (
    echo ERROR: Could not create staging folder:
    echo %STAGING%
    exit /b 1
)


REM ==========================================
REM Copy standalone Next.js application
REM ==========================================

echo.
echo Copying standalone application...

robocopy "%SRC%\.next\standalone" "%STAGING%" /E /R:2 /W:1 /NFL /NDL /NJH /NJS /NP

if errorlevel 8 (
    echo ERROR: Failed to copy standalone application.

    if exist "%STAGING%" (
        rmdir /s /q "%STAGING%"
    )

    exit /b 1
)


REM ==========================================
REM Copy Next.js static files
REM ==========================================

echo.
echo Copying Next.js static files...

if not exist "%STAGING%\.next\static" (
    mkdir "%STAGING%\.next\static"
)

robocopy "%SRC%\.next\static" "%STAGING%\.next\static" /E /R:2 /W:1 /NFL /NDL /NJH /NJS /NP

if errorlevel 8 (
    echo ERROR: Failed to copy Next.js static files.

    if exist "%STAGING%" (
        rmdir /s /q "%STAGING%"
    )

    exit /b 1
)


REM ==========================================
REM Copy public folder
REM ==========================================

if exist "%SRC%\public" (

    echo.
    echo Copying public folder...

    robocopy "%SRC%\public" "%STAGING%\public" /E /R:2 /W:1 /NFL /NDL /NJH /NJS /NP

    if errorlevel 8 (
        echo ERROR: Failed to copy public folder.

        if exist "%STAGING%" (
            rmdir /s /q "%STAGING%"
        )

        exit /b 1
    )
)


REM ==========================================
REM Copy web.config
REM ==========================================

echo.
echo Copying web.config...

copy /Y "%SRC%\web.config" "%STAGING%\web.config" >nul

if errorlevel 1 (
    echo ERROR: Failed to copy web.config.

    if exist "%STAGING%" (
        rmdir /s /q "%STAGING%"
    )

    exit /b 1
)


REM ==========================================
REM Copy production environment file
REM ==========================================

echo.
echo Copying production environment file...

copy /Y "%SRC%\%ENVFILE%" "%STAGING%\.env.production" >nul

if errorlevel 1 (
    echo ERROR: Failed to copy %ENVFILE%.

    if exist "%STAGING%" (
        rmdir /s /q "%STAGING%"
    )

    exit /b 1
)


REM ==========================================
REM Verify staged files
REM ==========================================

echo.
echo Verifying staged deployment...

if not exist "%STAGING%\server.js" (
    echo ERROR: server.js is missing from staging folder.
    exit /b 1
)

if not exist "%STAGING%\web.config" (
    echo ERROR: web.config is missing from staging folder.
    exit /b 1
)

if not exist "%STAGING%\.env.production" (
    echo ERROR: .env.production is missing from staging folder.
    exit /b 1
)


REM ==========================================
REM Create deployment ZIP
REM ==========================================

echo.
echo Compressing production deployment package...

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
"$ErrorActionPreference='Stop'; Compress-Archive -Path '%STAGING%\*' -DestinationPath '%PACKAGE%' -Force"

if errorlevel 1 (
    echo ERROR: Failed to create deployment ZIP.

    if exist "%STAGING%" (
        rmdir /s /q "%STAGING%"
    )

    exit /b 1
)


REM ==========================================
REM Remove temporary staging folder
REM ==========================================

echo.
echo Cleaning temporary staging folder...

if exist "%STAGING%" (
    rmdir /s /q "%STAGING%"
)


REM ==========================================
REM Verify ZIP
REM ==========================================

if not exist "%PACKAGE%" (
    echo ERROR: Deployment ZIP was not created:
    echo %PACKAGE%
    exit /b 1
)

echo.
echo Deployment package successfully created:
echo %PACKAGE%


REM ==========================================
REM Stop production service
REM ==========================================

echo.
echo Stopping production service...

ssh -i "%SSH_KEY%" -p %SSH_PORT% %SSH_USER%@%SERVER% "powershell -NoProfile -ExecutionPolicy Bypass -Command ""$ErrorActionPreference='Stop'; Write-Host 'Stopping service: %SERVICE%'; Stop-Service '%SERVICE%' -Force -ErrorAction SilentlyContinue; Start-Sleep -Seconds 5;"""

if errorlevel 1 (
    echo ERROR: Could not stop the production service.
    exit /b 1
)


REM ==========================================
REM Upload deployment package
REM ==========================================

echo.
echo Copying production package to server...

scp -i "%SSH_KEY%" -P %SSH_PORT% "%PACKAGE%" %SSH_USER%@%SERVER%:%REMOTE_UPLOAD%

if errorlevel 1 (
    echo ERROR: Failed to copy package to production server.
    exit /b 1
)


REM ==========================================
REM Reset production folder
REM Expand ZIP
REM Restart service
REM ==========================================

echo.
echo Expanding package and restarting production service...

ssh -i "%SSH_KEY%" -p %SSH_PORT% %SSH_USER%@%SERVER% "powershell -NoProfile -ExecutionPolicy Bypass -Command ""$ErrorActionPreference='Stop'; $uploadFile=Join-Path $env:USERPROFILE '%REMOTE_UPLOAD%'; Write-Host 'Uploaded ZIP:' $uploadFile; if (-not (Test-Path $uploadFile)) { throw 'Uploaded deployment ZIP was not found.' }; if (Test-Path '%REMOTE_DST%') { Write-Host 'Removing old production folder'; Remove-Item '%REMOTE_DST%' -Recurse -Force }; Write-Host 'Creating production folder'; [void](New-Item -ItemType Directory -Force -Path '%REMOTE_DST%'); Write-Host 'Expanding production package'; Expand-Archive -Path $uploadFile -DestinationPath '%REMOTE_DST%' -Force; Remove-Item $uploadFile -Force -ErrorAction SilentlyContinue; Write-Host 'Starting service: %SERVICE%'; Start-Service '%SERVICE%'; Start-Sleep -Seconds 8; Write-Host 'Restarting IIS'; iisreset; Start-Sleep -Seconds 5; Write-Host 'Service status:'; Get-Service '%SERVICE%'; Write-Host 'Checking deployed files:'; Get-Item '%REMOTE_DST%\server.js'; Get-Item '%REMOTE_DST%\web.config'; Get-Item '%REMOTE_DST%\.env.production';"""

if errorlevel 1 (
    echo ERROR: Failed to expand the package or restart production.
    exit /b 1
)


REM ==========================================
REM Remove local deployment ZIP
REM ==========================================

echo.
echo Removing local deployment ZIP...

if exist "%PACKAGE%" (
    del /f /q "%PACKAGE%"
)


REM ==========================================
REM Production health check
REM ==========================================

echo.
echo Checking production website...
echo URL: %HEALTH_URL%

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
"$ErrorActionPreference='Stop'; $url='%HEALTH_URL%'; $success=$false; for ($attempt=1; $attempt -le 5; $attempt++) { try { Write-Host ('Health check attempt ' + $attempt + ' of 5...'); $response=Invoke-WebRequest $url -UseBasicParsing -TimeoutSec 30; Write-Host ('HTTP Status: ' + $response.StatusCode); if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 400) { $success=$true; break } } catch { Write-Host ('Health check failed: ' + $_.Exception.Message) }; Start-Sleep -Seconds 8 }; if (-not $success) { exit 1 }"

if errorlevel 1 (
    echo.
    echo ==========================================
    echo WARNING: DEPLOYMENT FINISHED,
    echo BUT THE HEALTH CHECK FAILED.
    echo ==========================================
    echo.
    echo Check the service on the server:
    echo   Get-Service %SERVICE%
    echo.
    echo Check the site locally on the server:
    echo   Invoke-WebRequest http://localhost:%PORT%
    echo.
    exit /b 1
)


REM ==========================================
REM Complete
REM ==========================================

echo.
echo ==========================================
echo PRODUCTION DEPLOY COMPLETE
echo ==========================================
echo Website: %HEALTH_URL%
echo Service: %SERVICE%
echo Port:    %PORT%
echo ==========================================
echo.

endlocal
exit /b 0