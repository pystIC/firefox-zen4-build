/*******************************************************************************
 * OPTIMIZED FIREFOX 150 - Gaming PC Profile
 * System: Ryzen 5 7600X | RX 9070 XT | 4K 160Hz | 32GB DDR5
 *
 * Built on top of Betterfox v150 with additional performance, low-resource,
 * and GPU-offload tuning for a gaming PC where Firefox runs alongside games.
 * Goal: Edge-level snappiness with lower RAM/CPU, better privacy.
 *
 * Categories:
 *   SECTION 1: PERFORMANCE (speed, GPU offload, process limits)
 *   SECTION 2: RESOURCE MANAGEMENT (RAM, cache, tab unloading)
 *   SECTION 3: NETWORK (fast page loads, low latency)
 *   SECTION 4: SCROLLING (tuned for 160Hz display)
 *   SECTION 5: PRIVACY & TELEMETRY (kill all phoning home)
 *   SECTION 6: UI DECLUTTER (remove bloat, snappy transitions)
 *   SECTION 7: MEDIA / PIP (YouTube PiP while gaming)
 ******************************************************************************/

/****************************************************************************
 * SECTION 1: PERFORMANCE — GPU Offload & Rendering                         *
 ****************************************************************************/

// Force hardware-accelerated rendering (WebRender) — offloads to RX 9070 XT
user_pref("gfx.webrender.all", true);
user_pref("gfx.webrender.enabled", true);
user_pref("gfx.webrender.compositor.force-enabled", true);
user_pref("gfx.webrender.dcomp-video-hw-overlay-win-force-enabled", true);
user_pref("gfx.webrender.precache-shaders", true);
user_pref("gfx.webrender.dcomp-use-virtual-surfaces", true);

// Hardware-accelerated canvas (uses GPU for 2D drawing, less CPU)
user_pref("gfx.canvas.accelerated", true);
user_pref("gfx.canvas.accelerated.cache-items", 32768);
user_pref("gfx.canvas.accelerated.cache-size", 4096);

// Enable hardware video decoding via WMF/D3D11 (RX 9070 XT on Windows)
user_pref("media.hardware-video-decoding.enabled", true);
user_pref("media.hardware-video-decoding.force-enabled", true);

// Use GPU for compositing
user_pref("layers.gpu-process.enabled", true);
user_pref("layers.gpu-process.force-enabled", true);

// Reduce layout reflows — render paint less frequently during page load
// (reduces CPU spikes during complex page rendering)
user_pref("content.notify.interval", 100000);

// JIT compilation optimizations
user_pref("javascript.options.baselinejit", true);
user_pref("javascript.options.ion", true);

/****************************************************************************
 * SECTION 2: RESOURCE MANAGEMENT — RAM & Process Control                   *
 ****************************************************************************/

// Disable disk cache — use memory only (you have 32GB + NVMe, no need
// for disk cache I/O competing with game asset loading)
user_pref("browser.cache.disk.enable", false);

// Memory cache limit: 256MB (enough for active tabs, keeps total under 1GB)
user_pref("browser.cache.memory.enable", true);
user_pref("browser.cache.memory.capacity", 262144);

// Force media into memory cache (prevents disk I/O during PiP video)
user_pref("browser.privatebrowsing.forceMediaMemoryCache", true);
user_pref("media.memory_cache_max_size", 65536);

// Auto-unload background tabs when memory is low
user_pref("browser.tabs.unloadOnLowMemory", true);

// Unload inactive tabs after 5 minutes (Edge Memory Saver equivalent).
// 60s was too aggressive — caused constant tab-reload storms during gaming.
user_pref("browser.tabs.min_inactive_duration_before_unload", 300000);

// Lower the memory pressure threshold so tabs get unloaded sooner
user_pref("browser.low_commit_space_threshold_mb", 1024);
user_pref("browser.low_commit_space_threshold_percent", 10);

// Reduce session store saves (less I/O, less CPU interruption)
user_pref("browser.sessionstore.interval", 60000);

// Disable accessibility services if unused (saves ~50-100MB RAM)
user_pref("accessibility.force_disabled", 1);

// CPU/power efficiency — don't preload processes we're not using yet
user_pref("dom.ipc.processPrelaunch.enabled", false);
user_pref("browser.tabs.remote.warmup.enabled", false);

// Disable push notifications (unnecessary background wake-ups)
user_pref("dom.push.enabled", false);
user_pref("dom.push.connection.enabled", false);

/****************************************************************************
 * SECTION 3: NETWORK — Fast Page Loads, Low Latency                        *
 ****************************************************************************/

// QUIC / HTTP/3 — modern protocol, faster connections
user_pref("network.http.http3.enable", true);

// Increase connections for faster parallel downloads
user_pref("network.http.max-connections", 1800);
user_pref("network.http.max-urgent-start-excessive-connections-per-host", 5);

// DNS-over-HTTPS (Cloudflare) — faster + private DNS resolution
user_pref("network.trr.mode", 3);
user_pref("network.trr.uri", "https://mozilla.cloudflare-dns.com/dns-query");

// Enable DNS prefetching for speed (overrides Betterfox privacy default)
// Since we're optimizing for SPEED here, not maximum privacy
user_pref("network.dns.disablePrefetch", false);
user_pref("network.dns.disablePrefetchFromHTTPS", false);
user_pref("network.predictor.enabled", true);

// Speculative connections for faster link clicking
user_pref("network.http.speculative-parallel-limit", 6);
user_pref("network.prefetch-next", true);
user_pref("browser.urlbar.speculativeConnect.enabled", true);
user_pref("browser.places.speculativeConnect.enabled", true);

// Faster TLS handshakes
user_pref("security.ssl.enable_ocsp_stapling", true);

// TCP Fast Open — reduces RTT on repeated connections
user_pref("network.tcp.tcp_fastopen_enable", true);

// Larger TLS session cache — skip full handshake on repeat visits
user_pref("network.ssl_tokens_cache_capacity", 10240);

/****************************************************************************
 * SECTION 4: SCROLLING — Tuned for 160Hz Display                           *
 ****************************************************************************/

// Natural Smooth Scrolling V3 — best for 120Hz+ displays
// Matches Chrome's Windows Scrolling Personality feel
user_pref("apz.overscroll.enabled", true);
user_pref("general.smoothScroll", true);
user_pref("general.smoothScroll.msdPhysics.continuousMotionMaxDeltaMS", 12);
user_pref("general.smoothScroll.msdPhysics.enabled", true);
user_pref("general.smoothScroll.msdPhysics.motionBeginSpringConstant", 600);
user_pref("general.smoothScroll.msdPhysics.regularSpringConstant", 650);
user_pref("general.smoothScroll.msdPhysics.slowdownMinDeltaMS", 25);
user_pref("general.smoothScroll.msdPhysics.slowdownMinDeltaRatio", "2");
user_pref("general.smoothScroll.msdPhysics.slowdownSpringConstant", 250);
user_pref("general.smoothScroll.currentVelocityWeighting", "1");
user_pref("general.smoothScroll.stopDecelerationWeighting", "1");
user_pref("mousewheel.default.delta_multiplier_y", 275);

/****************************************************************************
 * SECTION 5: PRIVACY & TELEMETRY — Kill All Phone-Home                     *
 ****************************************************************************/

// Strict tracking protection
user_pref("browser.contentblocking.category", "strict");
user_pref("privacy.globalprivacycontrol.enabled", true);

// Kill ALL telemetry (this is why you're leaving Edge)
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.usage.uploadEnabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false);
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("toolkit.telemetry.coverage.opt-out", true);
user_pref("toolkit.coverage.opt-out", true);
user_pref("toolkit.coverage.endpoint.base", "");
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);

// Kill experiments & studies
user_pref("app.shield.optoutstudies.enabled", false);
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");

// Kill crash reports
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false);

// Disable Safe Browsing remote lookups (local checks still active)
user_pref("browser.safebrowsing.downloads.remote.enabled", false);

// HTTPS-only mode
user_pref("dom.security.https_only_mode", true);
user_pref("dom.security.https_only_mode_error_page_user_suggestions", true);

// Harden SSL/TLS
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true);
user_pref("browser.xul.error_pages.expert_bad_cert", true);
user_pref("security.tls.enable_0rtt_data", false);

// Disable OCSP (privacy: doesn't leak visited sites to CAs)
user_pref("security.OCSP.enabled", 0);

// Trim referrers for cross-origin
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);

// Show punycode (anti-phishing)
user_pref("network.IDN_show_punycode", true);

/****************************************************************************
 * SECTION 6: UI DECLUTTER — Remove Bloat, Instant Transitions              *
 ****************************************************************************/

// Kill all AI features (CPU/RAM waste)
user_pref("browser.ai.control.default", "blocked");
user_pref("browser.ml.enable", false);
user_pref("browser.ml.chat.enabled", false);
user_pref("browser.ml.chat.menu", false);
user_pref("browser.tabs.groups.smart.enabled", false);
user_pref("browser.ml.linkPreview.enabled", false);

// Disable Pocket
user_pref("extensions.pocket.enabled", false);

// Disable cosmetic animations (snappier feel)
user_pref("toolkit.cosmeticAnimations.enabled", false);

// Instant fullscreen transitions (no delay for PiP or game switching)
user_pref("full-screen-api.transition-duration.enter", "0 0");
user_pref("full-screen-api.transition-duration.leave", "0 0");
user_pref("full-screen-api.warning.timeout", 0);

// Compact UI mode (more screen real estate)
user_pref("browser.compactmode.show", true);

// Allow custom CSS (userChrome.css)
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// Kill "What's New" / welcome pages
user_pref("browser.startup.homepage_override.mstone", "ignore");
user_pref("browser.aboutwelcome.enabled", false);
user_pref("browser.aboutConfig.showWarning", false);

// Disable sponsored content on new tab
user_pref("browser.newtabpage.activity-stream.default.sites", "");
user_pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.showSponsoredCheckboxes", false);

// Kill add-on recommendations
user_pref("extensions.getAddons.showPane", false);
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
user_pref("browser.discovery.enabled", false);
user_pref("extensions.getAddons.cache.enabled", false);

// Kill CFR recommendations
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);
user_pref("browser.preferences.moreFromMozilla", false);

// Don't check default browser
user_pref("browser.shell.checkDefaultBrowser", false);

// Disable UI Tour
user_pref("browser.uitour.enabled", false);

// Block desktop notifications by default
user_pref("permissions.default.desktop-notification", 2);

// Block geolocation by default
user_pref("permissions.default.geo", 2);

// Disable search suggestions (less network chatter)
user_pref("browser.search.suggest.enabled", false);
user_pref("browser.urlbar.quicksuggest.enabled", false);
user_pref("browser.urlbar.trending.featureGate", false);
user_pref("browser.urlbar.groupLabels.enabled", false);

// Trim HTTPS from URL bar
user_pref("browser.urlbar.trimHttps", true);
user_pref("browser.urlbar.untrimOnUserInteraction.featureGate", true);

// Disable form autofill
user_pref("browser.formfill.enable", false);

// Don't add downloads to Windows recent docs
user_pref("browser.download.manager.addToRecentDocs", false);

// Open PDFs inline
user_pref("browser.download.open_pdf_attachments_inline", true);

// Disable PDF scripting
user_pref("pdfjs.enableScripting", false);

// Disable search engine auto-update
user_pref("browser.search.update", false);

// Use downloads in temp dir
user_pref("browser.download.start_downloads_in_tmp_dir", true);

// Disable private window separation (less overhead)
user_pref("browser.privateWindowSeparation.enabled", false);

// Enable profiles
user_pref("browser.profiles.enabled", true);

// Findbar highlight all
user_pref("findbar.highlightAll", true);

// Don't eat space on word select
user_pref("layout.word_select.eat_space_to_next_word", false);

// Context menu view image info
user_pref("browser.menu.showViewImageInfo", true);

// Bookmarks open in tab behavior
user_pref("browser.bookmarks.openInTabClosesMenu", false);

// Containers UI
user_pref("privacy.userContext.ui.enabled", true);

// Limit extension scopes
user_pref("extensions.enabledScopes", 5);

// Login capture settings
user_pref("signon.formlessCapture.enabled", false);
user_pref("signon.privateBrowsingCapture.enabled", false);
user_pref("network.auth.subresource-http-auth-allow", 1);
user_pref("editor.truncate_user_pastes", false);

// Use Beacon DB instead of Google for geolocation
user_pref("geo.provider.network.url", "https://beacondb.net/v1/geolocate");
user_pref("permissions.manager.defaultsUrl", "");

// Privacy: isolate content scripts
user_pref("privacy.antitracking.isolateContentScriptResources", true);
user_pref("security.csp.reporting.enabled", false);

// Custom privacy history
user_pref("privacy.history.custom", true);
user_pref("browser.privatebrowsing.resetPBM.enabled", true);

// Search: separate private default
user_pref("browser.search.separatePrivateDefault.ui.enabled", true);

// Disable automatic updates (control when to update)
user_pref("app.update.auto", false);

/****************************************************************************
 * SECTION 7: MEDIA / PIP — YouTube PiP While Gaming                        *
 ****************************************************************************/

// Enable PiP by default
user_pref("media.videocontrols.picture-in-picture.enabled", true);
user_pref("media.videocontrols.picture-in-picture.video-toggle.enabled", true);

// Keep PiP window always on top
user_pref("media.videocontrols.picture-in-picture.allow-all-sites-by-default", true);

// Hardware decode for video (offload to GPU = less CPU while gaming)
user_pref("media.av1.enabled", true);
user_pref("media.mediasource.enabled", true);

// Reduce CPU wake-ups from media timers
user_pref("media.suspend-bkgnd-video.enabled", false);
// ^ Keep FALSE — we do NOT want to suspend background video (that's our PiP!)

// Allow autoplay (for sports streams)
user_pref("media.autoplay.default", 0);

// Low-latency audio for PiP — WASAPI event-driven at 20ms interactive latency
user_pref("media.webaudio.audiocontextoptions-latencyhint-interactive-ms", 20);
user_pref("media.cubeb_latency_playback_ms", 40);
user_pref("media.cubeb_latency_msg_ms", 20);

/****************************************************************************
 * SECTION 8: DEEP ENGINE TUNING — What Makes This FASTER Than Edge         *
 * These are the prefs Edge/Chromium can't match because Gecko exposes them *
 ****************************************************************************/

// --- STARTUP ---
// Show window skeleton immediately (perceived faster startup)
user_pref("browser.startup.preXulSkeletonUI", true);
// Cache compiled WebRender shaders to disk (avoids recompile on every launch)
user_pref("gfx.webrender.program-binary-disk", true);

// --- INSTANT PAINT ---
// Paint the page immediately (0ms delay) instead of waiting for full layout
// Edge waits for layout — this makes Firefox FEEL faster on every page load
user_pref("nglayout.initialpaint.delay", 0);
user_pref("nglayout.initialpaint.delay_in_oopif", 0);

// --- IMAGE DECODING (tuned for 4K display) ---
// Increase decoded image cache to 512MB (default ~256MB)
// At 4K resolution, images are 4x larger — this prevents re-decoding jank
user_pref("image.mem.surfacecache.max_size_kb", 524288);
// Minimum time before a cached surface expires: 120 seconds (default ~60s)
user_pref("image.mem.surfacecache.min_expiration_ms", 120000);
// Decode images eagerly in idle time (smoother scrolling on image-heavy pages)
user_pref("image.mem.decode_bytes_at_a_time", 65536);

// --- DNS CACHE (bigger = fewer lookups = faster browsing) ---
// Cache 1024 DNS entries (default 400) for 10 minutes (default 60s)
// This means repeat visits to YouTube, Twitch, Reddit etc are instant
user_pref("network.dnsCacheEntries", 1024);
user_pref("network.dnsCacheExpiration", 600);

// --- NETWORK BUFFERS ---
// Double the network buffer for faster data transfer processing
user_pref("network.buffer.cache.size", 262144);
user_pref("network.buffer.cache.count", 128);

// --- JAVASCRIPT GC/CC TUNING ---
// Reduce garbage collection pauses (the #1 cause of browser micro-stutters)
// Incremental GC: smaller, more frequent GC slices = less jank
user_pref("javascript.options.mem.gc_incremental", true);
user_pref("javascript.options.mem.gc_per_zone", true);

// --- FISSION (Site Isolation) PROCESS TUNING ---
// Keep Fission ON for security but limit isolated processes
// This is the Edge equivalent of "sleeping tabs" — fewer processes = less RAM
user_pref("fission.autostart", true);
// Fission isolation: 4 isolated web processes — enough parallelism without RAM waste
user_pref("dom.ipc.processCount.webIsolated", 4);
// Limit file/extension/privilegedabout processes to 1 each
user_pref("dom.ipc.processCount.file", 1);
user_pref("dom.ipc.processCount.extension", 1);
user_pref("dom.ipc.processCount.privilegedabout", 1);

// --- PROCESS PRIORITY ---
// Disable Firefox's internal priority manager — Process Lasso ProBalance handles this,
// and two priority managers fighting each other cause jitter.
user_pref("dom.ipc.processPriorityManager.enabled", false);

// --- TIMER THROTTLING ---
// Throttle background tab timers immediately (0ms grace period).
// Tabs with active media (including PiP source tab) are automatically exempt,
// so PiP stays smooth even with aggressive throttling.
user_pref("dom.timeout.throttling_delay", 0);

// --- SERVICE WORKERS ---
// Limit service worker idle timeout (saves CPU when not actively needed)
user_pref("dom.serviceWorkers.idle_timeout", 30000);
user_pref("dom.serviceWorkers.idle_extended_timeout", 30000);

// --- WEBSOCKET ---
// Keep WebSocket alive longer (for live sports streams)
user_pref("network.websocket.timeout.ping.request", 88);

// --- FONT RENDERING ---
// Use DirectWrite font rendering (sharper text on high-DPI)
user_pref("gfx.font_rendering.directwrite.enabled", true);

// --- BACKGROUND TASKS ---
// Disable the default-browser-agent (phones home even when Firefox is closed)
user_pref("default-browser-agent.enabled", false);
// Disable background update checking
user_pref("app.update.background.scheduling.enabled", false);

// Fix Audio/Video Desync on 160Hz monitors with PiP
user_pref("media.wmf.vsync.enabled", true);
user_pref("media.wmf.vsync.force.enabled", true);
user_pref("media.audio_clock.pull_audio_clock", false);
user_pref("media.cubeb.wasapi.prefer-event-driven", true);
user_pref("gfx.webrender.force-picture-in-picture-vsync", true);

// Advanced Background Throttling (Sleeping Tabs)
user_pref("dom.min_background_timeout_value", 10000);
user_pref("dom.timeout.background_throttling_max_delay", 10000);
user_pref("dom.request_idle_callback.deadline", 100);
user_pref("network.http.max-persistent-connections-per-server", 6);