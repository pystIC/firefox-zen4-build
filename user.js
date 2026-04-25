/*******************************************************************************
 * SAFE FIREFOX TWEAKS - Stock Firefox + Privacy/UX/Network polish
 * System: Ryzen 5 7600X | RX 9070 XT | 4K 160Hz | 32GB DDR5
 *
 * Stripped-down version. ZERO GPU/rendering/process tampering — those caused
 * stability issues. Only safe wins: privacy kills, UI declutter, network
 * tuning, PiP defaults, and 160Hz smooth scrolling.
 *
 * Sections:
 *   1. PRIVACY & TELEMETRY (kill all phoning home)
 *   2. UI DECLUTTER (remove bloat)
 *   3. NETWORK (safe page-load wins)
 *   4. SCROLLING (tuned for 160Hz)
 *   5. MEDIA / PIP (YouTube PiP while gaming)
 ******************************************************************************/

/****************************************************************************
 * SECTION 1: PRIVACY & TELEMETRY                                           *
 ****************************************************************************/

// Strict tracking protection
user_pref("browser.contentblocking.category", "strict");
user_pref("privacy.globalprivacycontrol.enabled", true);

// Kill ALL telemetry
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

// Disable Safe Browsing remote lookups (local checks still work)
user_pref("browser.safebrowsing.downloads.remote.enabled", false);

// HTTPS-only mode
user_pref("dom.security.https_only_mode", true);
user_pref("dom.security.https_only_mode_error_page_user_suggestions", true);

// Trim referrers for cross-origin
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);

// Show punycode (anti-phishing)
user_pref("network.IDN_show_punycode", true);

// Disable OCSP (privacy: doesn't leak visited sites to CAs)
user_pref("security.OCSP.enabled", 0);

/****************************************************************************
 * SECTION 2: UI DECLUTTER                                                  *
 ****************************************************************************/

// Kill AI features
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

// Instant fullscreen transitions
user_pref("full-screen-api.transition-duration.enter", "0 0");
user_pref("full-screen-api.transition-duration.leave", "0 0");
user_pref("full-screen-api.warning.timeout", 0);

// Compact UI mode
user_pref("browser.compactmode.show", true);

// Allow custom CSS (userChrome.css)
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// Kill "What's New" / welcome pages
user_pref("browser.startup.homepage_override.mstone", "ignore");
user_pref("browser.aboutwelcome.enabled", false);
user_pref("browser.aboutConfig.showWarning", false);

// Kill sponsored content on new tab
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

// Don't add downloads to Windows recent docs
user_pref("browser.download.manager.addToRecentDocs", false);

// Default-browser-agent off (phones home even when Firefox is closed)
user_pref("default-browser-agent.enabled", false);

// Disable automatic updates (control when to update)
user_pref("app.update.auto", false);
user_pref("app.update.background.scheduling.enabled", false);

/****************************************************************************
 * SECTION 3: NETWORK                                                       *
 ****************************************************************************/

// HTTP/3 / QUIC
user_pref("network.http.http3.enable", true);

// DoH with fallback (mode 2, NOT 3 - mode 3 hangs if Cloudflare hiccups)
user_pref("network.trr.mode", 2);
user_pref("network.trr.uri", "https://mozilla.cloudflare-dns.com/dns-query");

// DNS prefetching for faster page loads
user_pref("network.dns.disablePrefetch", false);
user_pref("network.dns.disablePrefetchFromHTTPS", false);
user_pref("network.predictor.enabled", true);

// Speculative connections
user_pref("network.http.speculative-parallel-limit", 6);
user_pref("network.prefetch-next", true);
user_pref("browser.urlbar.speculativeConnect.enabled", true);
user_pref("browser.places.speculativeConnect.enabled", true);

// DNS cache: 1024 entries (default 400), 10min (default 60s)
user_pref("network.dnsCacheEntries", 1024);
user_pref("network.dnsCacheExpiration", 600);

// TLS session cache - skip full handshake on repeat visits
user_pref("network.ssl_tokens_cache_capacity", 10240);

// OCSP stapling for faster TLS
user_pref("security.ssl.enable_ocsp_stapling", true);

/****************************************************************************
 * SECTION 4: SCROLLING - Tuned for 160Hz Display                           *
 ****************************************************************************/

// Natural Smooth Scrolling V3 - best for 120Hz+ displays
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
 * SECTION 5: MEDIA / PIP                                                   *
 ****************************************************************************/

// Enable PiP by default
user_pref("media.videocontrols.picture-in-picture.enabled", true);
user_pref("media.videocontrols.picture-in-picture.video-toggle.enabled", true);
user_pref("media.videocontrols.picture-in-picture.allow-all-sites-by-default", true);

// AV1 + MediaSource enabled
user_pref("media.av1.enabled", true);
user_pref("media.mediasource.enabled", true);

// Don't suspend background video (keeps PiP playing)
user_pref("media.suspend-bkgnd-video.enabled", false);

// Allow autoplay (for sports streams)
user_pref("media.autoplay.default", 0);
