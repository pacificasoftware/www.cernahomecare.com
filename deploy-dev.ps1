$ErrorActionPreference = "Stop"

$Server = "Administrator@198.71.51.74"
$Port = "2222"
$RemoteTempZip = "C:/Windows/Temp/cerna-dev-deploy.zip"
$RemotePath = "C:\inetpub\wwwroot\dev.cernahomecare.com"
$ServiceName = "CernaHomeCareWebDev"
$ZipPath = ".\cerna-dev-deploy.zip"

Write-Host "Building local DEV package..."
npm run build

Write-Host "Creating deployment zip..."
if (Test-Path $ZipPath) {
    Remove-Item $ZipPath -Force
}

Compress-Archive `
    -Path .next, public, package.json, package-lock.json, web.config `
    -DestinationPath $ZipPath `
    -Force

Write-Host "Uploading zip to DEV server..."
scp -P $Port $ZipPath "${Server}:$RemoteTempZip"

Write-Host "Deploying on DEV server..."
ssh -p $Port $Server "powershell -NoProfile -ExecutionPolicy Bypass -Command `"Stop-Service '$ServiceName' -Force -ErrorAction SilentlyContinue; Start-Sleep -Seconds 2; Remove-Item '$RemotePath\*' -Recurse -Force -ErrorAction SilentlyContinue; Expand-Archive 'C:\Windows\Temp\cerna-dev-deploy.zip' '$RemotePath' -Force; Copy-Item '$RemotePath\.next\standalone\server.js' '$RemotePath\server.js' -Force; Start-Service '$ServiceName'; Start-Sleep -Seconds 5; Get-Service '$ServiceName'`""

Write-Host "DEV deployment complete."
Write-Host "Test: https://dev.cernahomecare.com/?v=dev-deploy"