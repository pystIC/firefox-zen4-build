# Custom Optimized Firefox (Zen 4 Gaming Build)

This repository contains the build recipe and patches for a highly customized Firefox compile targeting maximum gaming performance on Windows 11 (Ryzen 7600X / RX 9070 XT).

## Contents
1. `mozconfig` - The compiler flags. Enables PGO, LTO, and CPU-specific (`-arch:AVX512`) optimizations. Strips background telemetry, WebRTC, and updater code.
2. `tab-unloader.patch` - Source-level patch for `browser/components/tabbrowser/TabUnloader.sys.mjs`. Replicates Microsoft Edge's proactive "Sleeping Tabs" by enforcing a 60-second background timer.
3. `user.js` - Deployed configuration profile. Contains 178+ tweaks for zero UI animations, maximum VCN hardware acceleration (AV1/VP9), and WASAPI 160Hz sync fixes.
4. `run_build.ps1` - PowerShell script to trigger the `mach` build using the MozillaBuild MSYS2 environment natively.

## How to Build
1. Install [MozillaBuild](https://wiki.mozilla.org/MozillaBuild).
2. Install the [Rust Toolchain](https://rustup.rs/).
3. Clone the official Firefox source:
   `git clone https://github.com/mozilla/gecko-dev.git`
4. Apply the patch:
   `git -C gecko-dev apply ..\tab-unloader.patch`
5. Copy `mozconfig` into the `gecko-dev` directory.
6. Run `run_build.ps1` from the parent directory.
