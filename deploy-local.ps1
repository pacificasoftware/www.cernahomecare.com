param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("dev", "prod")]
    [string]$Target
) 

$ErrorActionPreference = "Stop"

$Source = "C:\SourceCode\CERNA\www.cernahomecare.com"
$Server = "198.71.51.74"
$SshUser = "Administrator"
$SshPort = "2222"
$SshKey = "$env:USERPROFILE\.ssh\cerna_deploy_key"

if ($Target -eq "dev") {
    $Service = "CernaHomeCareWebDev"
    $RemoteDestination = "C:\inetpub\wwwroot\dev.cernahomecare.com"
    $RemoteZip = "C:\deploy\cernahomecare-dev-deploy.zip"
    $LocalZip = Join-Path $Source "cernahomecare-dev-deploy.zip"
    $HealthUrl = "http://dev.cernahomecare.com"
}
else {
    $Service = "CernaHomeCareWeb"
    $RemoteDestination = "C:\inetpub\wwwroot\www.cernahomecare.com"
    $RemoteZip = "C:\deploy\cernahomecare-prod-deploy.zip"
    $LocalZip = Join-Path $Source "cernahomecare-prod-deploy.zip"
    $HealthUrl = "http://www.cernahomecare.com"
}

$PackageFolder = Join-Path $Source "deploy-package"

Write-Host ""
Write-Host "=========================================="
Write-Host "Deploying Cerna Homecare"
Write-Host "Target:      $Target"
Write-Host "Source:      $Source"
Write-Host "Server:      $Server"
Write-Host "SSH Port:    $SshPort"
Write-Host "Service:     $Service"
Write-Host "Destination: $RemoteDestination"
Write-Host "=========================================="
Write-Host ""

Set-Location $Source

Write-Host "=== Build locally ==="
Remove-Item ".next" -Recurse -Force -ErrorAction SilentlyContinue
npm run build

Write-Host "=== Verify standalone output ==="
if (!(Test-Path ".next\standalone\server.js")) {
    throw "server.js not found. Make sure next.config.js has output: 'standalone'."
}

Write-Host "=== Prepare package folder ==="
Remove-Item $PackageFolder -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item $LocalZip -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $PackageFolder | Out-Null

Write-Host "=== Copy standalone output ==="
Copy-Item ".next\standalone\*" $PackageFolder -Recurse -Force

Write-Host "=== Copy static assets ==="
New-Item -ItemType Directory -Path "$PackageFolder\.next\static" -Force | Out-Null
Copy-Item ".next\static\*" "$PackageFolder\.next\static" -Recurse -Force

Write-Host "=== Copy public folder ==="
Copy-Item "public" "$PackageFolder\public" -Recurse -Force

Write-Host "=== Copy web.config ==="
Copy-Item "web.config" "$PackageFolder\web.config" -Force

if ($Target -eq "dev") {
    Write-Host "=== Adjust web.config for dev port 3021 ==="
    (Get-Content "$PackageFolder\web.config") `
        -replace "localhost:3020", "localhost:3021" `
        | Set-Content "$PackageFolder\web.config"
}
else {
    Write-Host "=== Adjust web.config for prod port 3020 ==="
    (Get-Content "$PackageFolder\web.config") `
        -replace "localhost:3021", "localhost:3020" `
        | Set-Content "$PackageFolder\web.config"
}

Write-Host "=== Create ZIP ==="
Compress-Archive -Path "$PackageFolder\*" -DestinationPath $LocalZip -Force

if (!(Test-Path $LocalZip)) {
    throw "ZIP was not created: $LocalZip"
}

Write-Host "=== Ensure remote deploy folder exists ==="
ssh -i $SshKey -p $SshPort "$SshUser@$Server" "powershell -NoProfile -Command `"New-Item -ItemType Directory -Force -Path 'C:\deploy' | Out-Null`""

Write-Host "=== Remove old remote ZIP ==="
ssh -i $SshKey -p $SshPort "$SshUser@$Server" "powershell -NoProfile -Command `"Remove-Item '$RemoteZip' -Force -ErrorAction SilentlyContinue`""

Write-Host "=== Upload ZIP ==="
scp -i $SshKey -P $SshPort $LocalZip "${SshUser}@${Server}:/C:/deploy/$(Split-Path $LocalZip -Leaf)"

Write-Host "=== Verify remote ZIP ==="
ssh -i $SshKey -p $SshPort "$SshUser@$Server" "powershell -NoProfile -Command `"Get-Item '$RemoteZip' | Select-Object FullName,Length,LastWriteTime`""

Write-Host "=== Remote deploy ==="

$RemoteCommand = @"
Stop-Service '$Service' -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3

New-Item -ItemType Directory -Force -Path '$RemoteDestination' | Out-Null

Remove-Item '$RemoteDestination\*' -Recurse -Force -ErrorAction SilentlyContinue

Expand-Archive -Path '$RemoteZip' -DestinationPath '$RemoteDestination' -Force

Start-Service '$Service'

Start-Sleep -Seconds 3

Get-Service '$Service'
"@

ssh -i $SshKey -p $SshPort "$SshUser@$Server" "powershell -NoProfile -ExecutionPolicy Bypass -Command `"$RemoteCommand`""

Write-Host "=== Health check ==="

for ($i = 1; $i -le 30; $i++) {
    try {
        $response = Invoke-WebRequest -UseBasicParsing $HealthUrl -TimeoutSec 3
        if ($response.StatusCode -eq 200) {
            Write-Host ""
            Write-Host "Deploy complete. Site is up: $HealthUrl"
            exit 0
        }
    }
    catch {
        Start-Sleep -Seconds 1
    }
}

throw "Deploy finished, but health check failed: $HealthUrl"