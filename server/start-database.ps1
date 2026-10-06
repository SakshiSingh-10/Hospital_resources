$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$dbPath = Join-Path $projectRoot '.data\mongodb'
$logPath = Join-Path $projectRoot '.data\mongodb.log'
$mongod = 'C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe'
if (-not (Test-Path -LiteralPath $mongod)) { throw "MongoDB executable not found at $mongod. Install MongoDB Community Server or update this path." }
$listener = Get-NetTCPConnection -LocalPort 27017 -State Listen -ErrorAction SilentlyContinue
if ($listener) { Write-Output 'MongoDB is already listening on port 27017.'; exit 0 }
New-Item -ItemType Directory -Force -Path $dbPath | Out-Null
Start-Process -FilePath $mongod -ArgumentList @('--dbpath', ('"' + $dbPath + '"'), '--port', '27017', '--bind_ip', '127.0.0.1', '--logpath', ('"' + $logPath + '"'), '--logappend') -WindowStyle Hidden | Out-Null
for ($i = 0; $i -lt 20; $i++) {
  Start-Sleep -Milliseconds 500
  if (Get-NetTCPConnection -LocalPort 27017 -State Listen -ErrorAction SilentlyContinue) { Write-Output 'MongoDB started on 127.0.0.1:27017.'; exit 0 }
}
throw "MongoDB did not start. Check $logPath for details."
