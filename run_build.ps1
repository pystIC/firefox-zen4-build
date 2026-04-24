$env:MOZILLABUILD = "C:\mozilla-build\"
$env:PATH = "C:\Users\Devin\.cargo\bin;C:\mozilla-build\python3;C:\mozilla-build\python3\Scripts;C:\mozilla-build\msys2\usr\bin;$env:PATH"
$env:MOZCONFIG = "C:\firefox-src\firefox-150.0.1\mozconfig"
Set-Location -Path "C:\firefox-src\firefox-150.0.1"

Write-Host "Starting build..."
python mach build 2>&1 | Tee-Object -FilePath build.log
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed (exit code $LASTEXITCODE). See build.log for details."
    exit $LASTEXITCODE
}
Write-Host "Build complete."
