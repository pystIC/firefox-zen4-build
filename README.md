# Custom Optimized Firefox (Zen 4 Gaming Build)

This repository contains the build recipe and patches for a highly customized Firefox compile targeting maximum gaming performance on Windows 11 (Ryzen 7600X / RX 9070 XT).

## Contents
1. `mozconfig` - Compiler flags: PGO, cross-language LTO, and Zen 4-specific (`-march=znver4`) optimizations. Strips crash reporter, WebRTC, updater, and maintenance service.
2. `tab-unloader.patch` - Source-level patch for `browser/components/tabbrowser/TabUnloader.sys.mjs`. Replicates Microsoft Edge's proactive "Sleeping Tabs": polls every 60s, unloads tabs inactive for ≥5 minutes (configurable via `browser.tabs.min_inactive_duration_before_unload`).
3. `user.js` - Deployed configuration profile. Contains tuning for zero UI animations, AMD VCN hardware video decode (AV1/VP9), and WASAPI 160Hz audio sync.
4. `run_build.ps1` - PowerShell script to trigger the `mach` build using the MozillaBuild MSYS2 environment natively.

## How to Build
1. Install [MozillaBuild](https://wiki.mozilla.org/MozillaBuild).
2. Install the [Rust Toolchain](https://rustup.rs/).
3. Clone the official Firefox source:
   `git clone https://github.com/mozilla/gecko-dev.git`
4. Apply the patch:
   `git -C gecko-dev apply ../tab-unloader.patch`
5. Copy `mozconfig` into the `gecko-dev` directory.
6. Run `run_build.ps1` from the parent directory.

## Notes
- PGO adds ~1-2 hours to the build on a 7600X but gives ~10-15% runtime perf.
- `MOZ_MAKE_FLAGS=-j4` caps parallel jobs to prevent OOM during the PGO + LTO phase. With 32GB RAM you can raise this if you have thermal headroom.
