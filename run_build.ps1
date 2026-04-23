$env:MOZILLABUILD = "C:\mozilla-build\"
$env:PATH = "C:\Users\Devin\.cargo\bin;C:\mozilla-build\python3;C:\mozilla-build\python3\Scripts;C:\mozilla-build\msys2\usr\bin;$env:PATH"
$env:MOZCONFIG = "C:\Users\Devin\.gemini\antigravity\scratch\gecko-dev\mozconfig"
Set-Location -Path "C:\Users\Devin\.gemini\antigravity\scratch\gecko-dev"

# Building

# Building
Write-Host "Starting Build..."
python mach build > build.log 2>&1
