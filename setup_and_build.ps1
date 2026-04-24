# Firefox 150.0 - Zen 4 Gaming Build
# All-in-one: cleans, downloads, patches TabUnloader, and builds.
# Run from an Administrator PowerShell window.
# Do NOT close this window during the build (~4-6 hours).

$ErrorActionPreference = "Stop"
$SrcDir   = "C:\Users\Devin\ff"
$MozBuild = "C:\mozilla-build"

function Write-Step($msg) { Write-Host "`n=== $msg ===" -ForegroundColor Cyan }
function Write-OK($msg)   { Write-Host "  OK: $msg"     -ForegroundColor Green }
function Write-Fail($msg) { Write-Host "FAIL: $msg"     -ForegroundColor Red; exit 1 }

# ---------------------------------------------------------------------------
# PRE-FLIGHT
# ---------------------------------------------------------------------------
Write-Step "Pre-flight checks"

if (-not (Test-Path "$MozBuild\python3\python3.exe")) {
    Write-Fail "MozillaBuild not found at $MozBuild. Install from https://wiki.mozilla.org/MozillaBuild"
}
Write-OK "MozillaBuild found"

if (-not (Get-Command cargo -ErrorAction SilentlyContinue)) {
    Write-Fail "Rust/cargo not in PATH. Install from https://rustup.rs"
}
Write-OK "Rust/cargo found"

# ---------------------------------------------------------------------------
# CLEAN
# ---------------------------------------------------------------------------
Write-Step "Cleaning old build at $SrcDir"
if (Test-Path $SrcDir) {
    Remove-Item -Recurse -Force $SrcDir
    Write-OK "Removed old directory"
}
New-Item -ItemType Directory -Force $SrcDir | Out-Null
Write-OK "Created clean $SrcDir"

# ---------------------------------------------------------------------------
# DOWNLOAD SOURCE
# ---------------------------------------------------------------------------
Write-Step "Downloading Firefox 150.0 source (~600MB)"
$tarball = "$SrcDir\src.tar.xz"
Invoke-WebRequest `
    -Uri "https://archive.mozilla.org/pub/firefox/releases/150.0/source/firefox-150.0.source.tar.xz" `
    -OutFile $tarball
Write-OK "Download complete"

# ---------------------------------------------------------------------------
# EXTRACT
# ---------------------------------------------------------------------------
Write-Step "Extracting source (2-5 minutes)"
Push-Location $SrcDir
tar -xf src.tar.xz --strip-components=1
if ($LASTEXITCODE -ne 0) { Write-Fail "Extraction failed" }
Remove-Item src.tar.xz
Pop-Location
Write-OK "Extracted to $SrcDir"

# ---------------------------------------------------------------------------
# VERIFY
# ---------------------------------------------------------------------------
Write-Step "Verifying Firefox version"
$version = (Get-Content "$SrcDir\browser\config\version.txt").Trim()
if ($version -ne "150.0") { Write-Fail "Wrong source version: $version (expected 150.0)" }
Write-OK "Firefox $version confirmed"

# ---------------------------------------------------------------------------
# MOZCONFIG
# ---------------------------------------------------------------------------
Write-Step "Installing optimized mozconfig"
Invoke-WebRequest `
    -Uri "https://raw.githubusercontent.com/pystIC/firefox-zen4-build/master/mozconfig" `
    -OutFile "$SrcDir\mozconfig"
Write-OK "mozconfig installed (cross LTO + PGO + Zen 4)"

# ---------------------------------------------------------------------------
# PATCH TABUNLOADER
# ---------------------------------------------------------------------------
Write-Step "Patching TabUnloader.sys.mjs (proactive tab unloading)"

$tabFile = "$SrcDir\browser\components\tabbrowser\TabUnloader.sys.mjs"
if (-not (Test-Path $tabFile)) { Write-Fail "TabUnloader.sys.mjs not found at $tabFile" }

# Read with exact bytes, normalize to LF for reliable matching
$raw  = [System.IO.File]::ReadAllText($tabFile)
$norm = $raw.Replace("`r`n", "`n")

$find = "    watcher.registerTabUnloader(this);`n  },"

$insert = @"
    watcher.registerTabUnloader(this);

    if (Services.prefs.getBoolPref("browser.tabs.unloadOnLowMemory", true)) {
      this._startProactiveUnloadTimer();
    }
  },

  _startProactiveUnloadTimer() {
    if (this._proactiveTimer) {
      return;
    }
    this._proactiveTimer = Cc["@mozilla.org/timer;1"].createInstance(
      Ci.nsITimer
    );
    const checkAndUnload = async () => {
      if (!Services.prefs.getBoolPref("browser.tabs.unloadOnLowMemory", true)) {
        this._stopProactiveUnloadTimer();
        return;
      }
      const minInactive = Services.prefs.getIntPref(
        "browser.tabs.min_inactive_duration_before_unload",
        600000
      );
      try {
        await this.unloadLeastRecentlyUsedTab(minInactive);
      } catch (e) {
        Services.console.logStringMessage("Proactive unload error: " + e);
      } finally {
        if (this._proactiveTimer) {
          this._proactiveTimer.initWithCallback(
            checkAndUnload,
            60000,
            Ci.nsITimer.TYPE_ONE_SHOT
          );
        }
      }
    };
    this._proactiveTimer.initWithCallback(
      checkAndUnload,
      60000,
      Ci.nsITimer.TYPE_ONE_SHOT
    );
  },

  _stopProactiveUnloadTimer() {
    if (this._proactiveTimer) {
      this._proactiveTimer.cancel();
      this._proactiveTimer = null;
    }
  },
"@

if (-not $norm.Contains($find)) {
    Write-Fail "Could not find TabUnloader injection point. Firefox 150.0 source may differ — check indentation."
}

$patched = $norm.Replace($find, $insert)
[System.IO.File]::WriteAllText($tabFile, $patched)

if (-not (Select-String -Path $tabFile -Pattern "_startProactiveUnloadTimer" -Quiet)) {
    Write-Fail "Patch verification failed after write"
}
Write-OK "TabUnloader patched and verified"

# ---------------------------------------------------------------------------
# INSTALL USER.JS
# ---------------------------------------------------------------------------
Write-Step "Reminder: copy user.js to your Firefox profile after build"
Write-Host "  Download from: https://raw.githubusercontent.com/pystIC/firefox-zen4-build/master/user.js" -ForegroundColor Yellow
Write-Host "  Copy to: %APPDATA%\Mozilla\Firefox\Profiles\<your-profile>\user.js" -ForegroundColor Yellow

# ---------------------------------------------------------------------------
# BUILD
# ---------------------------------------------------------------------------
Write-Step "Starting build — PGO + cross LTO + Zen 4 (~4-6 hours)"
Write-Host "  Log file: $SrcDir\build.log" -ForegroundColor Yellow
Write-Host "  Monitor lld-link.exe in Task Manager during the long silent link phase." -ForegroundColor Yellow
Write-Host "  DO NOT close this window.`n" -ForegroundColor Red

$env:MOZILLABUILD = "$MozBuild\"
$env:PATH         = "C:\Users\Devin\.cargo\bin;$MozBuild\python3;$MozBuild\python3\Scripts;$MozBuild\msys2\usr\bin;$env:PATH"
$env:MOZCONFIG    = "$SrcDir\mozconfig"
Set-Location $SrcDir

python mach build 2>&1 | Tee-Object -FilePath "$SrcDir\build.log"

if ($LASTEXITCODE -ne 0) {
    Write-Fail "Build failed (exit $LASTEXITCODE). See $SrcDir\build.log"
}

# ---------------------------------------------------------------------------
# DONE
# ---------------------------------------------------------------------------
Write-Step "BUILD COMPLETE"
Write-OK "Firefox binary: $SrcDir\obj-x86_64-pc-windows-msvc\dist\bin\firefox.exe"
Write-Host "`n  Next: copy user.js to your Firefox profile, then launch firefox.exe" -ForegroundColor Cyan
