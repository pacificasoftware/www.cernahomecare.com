@echo off
setlocal EnableExtensions EnableDelayedExpansion

REM ==========================================
REM Cerna Home Care Website - DEV Deploy
REM ==========================================

set "SRC=C:\SourceCode\CERNA_HEALTH_CARE\CERNA_HOME_CARE\www.cernahomecare.com"

set "SERVER=198.71.51.74"
set "SSH_PORT=22"
set "SSH_USER=Administrator"
set "SSH_KEY=%USERPROFILE%\.ssh\cerna_deploy_key"

REM ==========================================
REM DEV Site Configuration
REM ==========================================

set "REMOTE_DST=C:\inetpub\wwwroot\dev.cernahomecare.com"
set "SERVICE=CernaHomeCareWebDev"
set "ENVFILE=.env.production"
set "PORT=3021"
set "HEALTH_URL=https://dev.cernahomecare.com"

set "PACKAGE=%SRC%\deploy-web-dev.zip"
set "REMOTE_ZIP=%REMOTE_DST%\deploy-web-dev.zip"

REM ==========================================
REM Short Drive Used During Packaging
REM ==========================================

set "SHORT_DRIVE=R:"

echo.
echo ==========================================
echo Cerna Home Care Website - DEV Deploy
echo ==========================================
echo.
echo Source:      %SRC%
echo Destination: %REMOTE_DST%
echo Service:     %SERVICE%
echo Port:        %PORT%
echo Env File:    %ENVFILE%
echo Health URL:  %HEALTH_URL%
echo.
echo ==========================================
echo.

REM ==========================================
REM Verify Source Folder
REM ==========================================

if not exist "%SRC%" (
    echo ERROR: Source folder does not exist:
    echo %SRC%
    exit /b 1
)

cd /d "%SRC%" || exit /b 1

REM ==========================================
REM Verify package.json
REM ==========================================

if not exist "%SRC%\package.json" (
    echo ERROR: package.json not found.
    echo Expected:
    echo %SRC%\package.json
    exit /b 1
)

REM ==========================================
REM Verify Environment File
REM ==========================================

echo.
echo Checking environment file...

if not exist "%SRC%\%ENVFILE%" (
    echo ERROR: Environment file not found:
    echo %SRC%\%ENVFILE%
    exit /b 1
)

echo Environment file found:
echo %SRC%\%ENVFILE%

REM ==========================================
REM Display API Environment Setting
REM ==========================================

echo.
echo Checking API configuration...

findstr /B /C:"NEXT_PUBLIC_API_BASE_URL=" "%SRC%\%ENVFILE%" >nul 2>&1

if errorlevel 1 (
    echo WARNING: NEXT_PUBLIC_API_BASE_URL is not explicitly defined.
    echo The website will use the fallback API URL from lib\locations.ts.
) else (
    findstr /B /C:"NEXT_PUBLIC_API_BASE_URL=" "%SRC%\%ENVFILE%"
)

REM ==========================================
REM Verify web.config
REM ==========================================

echo.
echo Checking web.config...

if not exist "%SRC%\web.config" (
    echo ERROR: web.config not found:
    echo %SRC%\web.config
    exit /b 1
)

REM ==========================================
REM Verify Shared Getting Started CSS
REM ==========================================

echo.
echo Checking Getting Started CSS...

if not exist "%SRC%\app\getting-started\getting-started.css" (
    echo ERROR: Shared Getting Started CSS not found.
    echo Expected:
    echo %SRC%\app\getting-started\getting-started.css
    exit /b 1
)

REM ==========================================
REM Install Dependencies
REM ==========================================

echo.
echo ==========================================
echo Installing dependencies...
echo ==========================================
echo.

call npm install

if errorlevel 1 (
    echo.
    echo ERROR: npm install failed.
    exit /b 1
)

REM ==========================================
REM Remove Old Local Build
REM ==========================================

echo.
echo ==========================================
echo Removing old local build...
echo ==========================================
echo.

if exist "%SRC%\.next" (
    echo Stopping local Node processes that may lock .next...

    taskkill /F /IM node.exe >nul 2>&1

    echo Removing .next folder...

    rmdir /s /q "%SRC%\.next"

    if exist "%SRC%\.next" (
        echo.
        echo ERROR: Could not remove .next folder.
        echo Close any running npm or Next.js development servers.
        exit /b 1
    )
)

REM ==========================================
REM Build Next.js Application
REM ==========================================

echo.
echo ==========================================
echo Building Next.js app...
echo ==========================================
echo.

call npm run build

if errorlevel 1 (
    echo.
    echo ==========================================
    echo ERROR: Next.js build failed.
    echo ==========================================
    echo.
    echo Deployment has been stopped.
    echo Nothing was copied to the DEV server.
    echo.
    exit /b 1
)

REM ==========================================
REM Verify Standalone Build
REM ==========================================

echo.
echo Checking standalone output...

if not exist "%SRC%\.next\standalone\server.js" (
    echo.
    echo ERROR: .next\standalone\server.js not found.
    echo.
    echo Make sure next.config has:
    echo output: "standalone"
    echo.
    exit /b 1
)

REM ==========================================
REM Remove Old Deployment Package
REM ==========================================

echo.
echo Removing old deploy zip...

if exist "%PACKAGE%" (
    del /f /q "%PACKAGE%"
)

REM ==========================================
REM Create Short Drive Mapping
REM ==========================================

echo.
echo ==========================================
echo Creating short path for packaging...
echo ==========================================
echo.

REM Remove an old SUBST mapping if this script left one behind.
subst %SHORT_DRIVE% /D >nul 2>&1

REM Make sure the drive letter is not already a real drive.
if exist "%SHORT_DRIVE%\" (
    echo ERROR: Drive %SHORT_DRIVE% is already in use.
    echo Change SHORT_DRIVE near the top of this script.
    exit /b 1
)

subst %SHORT_DRIVE% "%SRC%"

if errorlevel 1 (
    echo ERROR: Could not create short drive mapping.
    exit /b 1
)

echo Short path created:
echo %SHORT_DRIVE% = %SRC%

REM ==========================================
REM Remove Old Staging Folder
REM ==========================================

if exist "%SHORT_DRIVE%\deploy-package" (
    rmdir /s /q "%SHORT_DRIVE%\deploy-package"
)

REM ==========================================
REM Create Deployment Package
REM ==========================================

echo.
echo ==========================================
echo Creating deploy package...
echo ==========================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; New-Item -ItemType Directory -Force '%SHORT_DRIVE%\deploy-package' | Out-Null; Copy-Item '%SHORT_DRIVE%\.next\standalone\*' '%SHORT_DRIVE%\deploy-package' -Recurse -Force; New-Item -ItemType Directory -Force '%SHORT_DRIVE%\deploy-package\.next\static' | Out-Null; Copy-Item '%SHORT_DRIVE%\.next\static\*' '%SHORT_DRIVE%\deploy-package\.next\static' -Recurse -Force; if (Test-Path '%SHORT_DRIVE%\public') { Copy-Item '%SHORT_DRIVE%\public' '%SHORT_DRIVE%\deploy-package\public' -Recurse -Force }; Copy-Item '%SHORT_DRIVE%\web.config' '%SHORT_DRIVE%\deploy-package\web.config' -Force; Copy-Item '%SHORT_DRIVE%\%ENVFILE%' '%SHORT_DRIVE%\deploy-package\.env.production' -Force; Compress-Archive -Path '%SHORT_DRIVE%\deploy-package\*' -DestinationPath '%SHORT_DRIVE%\deploy-web-dev.zip' -Force"

if errorlevel 1 (
    echo.
    echo ERROR: Failed to create deployment package.

    if exist "%SHORT_DRIVE%\deploy-package" (
        rmdir /s /q "%SHORT_DRIVE%\deploy-package"
    )

    subst %SHORT_DRIVE% /D >nul 2>&1

    exit /b 1
)

REM ==========================================
REM Remove Staging Folder
REM ==========================================

echo.
echo Removing temporary deploy folder...

if exist "%SHORT_DRIVE%\deploy-package" (
    rmdir /s /q "%SHORT_DRIVE%\deploy-package"
)

REM ==========================================
REM Remove Short Drive Mapping
REM ==========================================

echo.
echo Removing short path mapping...

subst %SHORT_DRIVE% /D

if errorlevel 1 (
    echo WARNING: Could not remove %SHORT_DRIVE% mapping.
)

REM ==========================================
REM Verify Deployment Package
REM ==========================================

if not exist "%PACKAGE%" (
    echo.
    echo ERROR: Deployment zip was not created.
    echo Expected:
    echo %PACKAGE%
    exit /b 1
)

echo.
echo Deployment package created:
echo %PACKAGE%

REM ==========================================
REM Stop DEV Service and Reset Remote Folder
REM ==========================================

echo.
echo ==========================================
echo Preparing DEV server...
echo ==========================================
echo.

ssh -i "%SSH_KEY%" -p %SSH_PORT% %SSH_USER%@%SERVER% "powershell -NoProfile -ExecutionPolicy Bypass -Command ""$ErrorActionPreference='Stop'; Stop-Service '%SERVICE%' -Force -ErrorAction SilentlyContinue; Start-Sleep -Seconds 5; if (Test-Path '%REMOTE_DST%') { Remove-Item '%REMOTE_DST%' -Recurse -Force -ErrorAction SilentlyContinue }; New-Item -ItemType Directory -Force '%REMOTE_DST%' | Out-Null"""

if errorlevel 1 (
    echo.
    echo ERROR: Failed preparing DEV server.
    exit /b 1
)

REM ==========================================
REM Copy Deployment Package to DEV Server
REM ==========================================

echo.
echo ==========================================
echo Copying package to DEV server...
echo ==========================================
echo.

scp -i "%SSH_KEY%" -P %SSH_PORT% "%PACKAGE%" %SSH_USER%@%SERVER%:"%REMOTE_ZIP%"

if errorlevel 1 (
    echo.
    echo ERROR: Failed copying deployment package to DEV server.
    exit /b 1
)

REM ==========================================
REM Expand Package and Restart DEV Service
REM ==========================================

echo.
echo ==========================================
echo Expanding package and restarting DEV...
echo ==========================================
echo.

ssh -i "%SSH_KEY%" -p %SSH_PORT% %SSH_USER%@%SERVER% "powershell -NoProfile -ExecutionPolicy Bypass -Command ""$ErrorActionPreference='Stop'; Expand-Archive -Path '%REMOTE_ZIP%' -DestinationPath '%REMOTE_DST%' -Force; Remove-Item '%REMOTE_ZIP%' -Force -ErrorAction SilentlyContinue; Start-Service '%SERVICE%'; Start-Sleep -Seconds 5; iisreset; Get-Service '%SERVICE%'; Get-Item '%REMOTE_DST%\server.js'; Get-Item '%REMOTE_DST%\web.config'; Get-Item '%REMOTE_DST%\.env.production'"""

if errorlevel 1 (
    echo.
    echo ERROR: Failed expanding package or restarting DEV service.
    exit /b 1
)

REM ==========================================
REM Remove Local Deployment Package
REM ==========================================

echo.
echo Removing local deploy zip...

if exist "%PACKAGE%" (
    del /f /q "%PACKAGE%"
)

REM ==========================================
REM DEV Health Check
REM ==========================================

echo.
echo ==========================================
echo Checking DEV site...
echo ==========================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r = Invoke-WebRequest '%HEALTH_URL%' -UseBasicParsing -TimeoutSec 30; Write-Host 'HTTP Status:' $r.StatusCode; if ($r.StatusCode -ne 200) { exit 1 } } catch { Write-Host 'Health check failed:' $_.Exception.Message; exit 1 }"

if errorlevel 1 (
    echo.
    echo ==========================================
    echo WARNING: DEV deployment completed
    echo but health check failed.
    echo ==========================================
    echo.
    exit /b 1
)

REM ==========================================
REM Complete
REM ==========================================

echo.
echo ==========================================
echo DEV deploy complete.
echo ==========================================
echo.
echo DEV Site:
echo %HEALTH_URL%
echo.
echo Service:
echo %SERVICE%
echo.
echo Port:
echo %PORT%
echo.
echo ==========================================
echo.

endlocal
exit /b 0