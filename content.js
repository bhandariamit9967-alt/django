(function() {
  'use strict';
 
  let hudActive = false;
  let hudRoot = null;
  let clockInterval = null;
  let statsInterval = null;
  let logInterval = null;
  let crosshairVisible = false;
 
  
  window.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'EVA_TOGGLE') {
      if (hudActive) {
        deactivateHUD();
      } else {
        activateHUD();
      }
    }
  });
 
  
  if (window.__EVA_LOADED) {
    if (hudActive) deactivateHUD(); else activateHUD();
  }
  window.__EVA_LOADED = true;
 
  function activateHUD() {
    if (hudActive) return;
    hudActive = true;
 
    
    hudRoot = document.createElement('div');
    hudRoot.id = 'nerv-hud-root';
    document.body.appendChild(hudRoot);
 
    hudRoot.innerHTML = buildHUDMarkup();
 
    
    startClock();
    startStats();
    startLog();
    setupCrosshair();
 
    // Add body padding so content isn't fully hidden
    document.documentElement.style.cssText += 'padding-top: 50px !important; padding-bottom: 44px !important;';
  }
 
  function deactivateHUD() {
    if (!hudActive) return;
    hudActive = false;
 
    if (hudRoot) {
      hudRoot.style.animation = 'none';
      hudRoot.style.opacity = '0';
      hudRoot.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        if (hudRoot) hudRoot.remove();
        hudRoot = null;
      }, 500);
    }
 
    clearInterval(clockInterval);
    clearInterval(statsInterval);
    clearInterval(logInterval);
 
    document.documentElement.style.paddingTop = '';
    document.documentElement.style.paddingBottom = '';
  }
 
  function buildHUDMarkup() {
    const nervMessages = getTickerMessages();
 
    return `
      <!-- Warning flash layer -->
      <div id="nerv-warning-flash"></div>
 
      <!-- Corner decorations -->
      <div class="nerv-corner" id="nerv-corner-tl"></div>
      <div class="nerv-corner" id="nerv-corner-tr"></div>
      <div class="nerv-corner" id="nerv-corner-bl"></div>
      <div class="nerv-corner" id="nerv-corner-br"></div>
 
      <!-- Frame grid lines -->
      <div id="nerv-frame-lines">
        <div class="nerv-frame-line h" style="top: 33%"></div>
        <div class="nerv-frame-line h" style="top: 66%"></div>
        <div class="nerv-frame-line v" style="left: 220px"></div>
        <div class="nerv-frame-line v" style="right: 220px"></div>
      </div>
 
      <!-- Close button -->
      <button id="nerv-close-btn" title="Deactivate NERV HUD">× TERMINATE</button>
 
      <!-- HEADER BAR -->
      <div id="nerv-header">
        <div class="nerv-brand">
          <svg class="nerv-logo-svg" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <polygon points="18,2 34,30 2,30" fill="none" stroke="#FF6600" stroke-width="1.5"/>
            <polygon points="18,8 30,28 6,28" fill="none" stroke="#CC4400" stroke-width="0.5" opacity="0.6"/>
            <line x1="18" y1="2" x2="18" y2="30" stroke="#FF6600" stroke-width="0.5" opacity="0.5"/>
            <circle cx="18" cy="18" r="5" fill="#FF6600" opacity="0.7"/>
            <circle cx="18" cy="18" r="2.5" fill="#FF4400"/>
          </svg>
          <span class="nerv-wordmark">NERV</span>
        </div>
 
        <div class="nerv-header-divider"></div>
 
        <div class="nerv-header-data">
          <div class="nerv-data-item">
            <span class="nerv-data-label">PILOT</span>
            <span class="nerv-data-value">IKARI·S</span>
          </div>
          <div class="nerv-data-item">
            <span class="nerv-data-label">UNIT</span>
            <span class="nerv-data-value">EVA-01</span>
          </div>
          <div class="nerv-data-item">
            <span class="nerv-data-label">MAGI STATUS</span>
            <span class="nerv-data-value green">3/3 ONLINE</span>
          </div>
          <div class="nerv-data-item">
            <span class="nerv-data-label">PATTERN</span>
            <span class="nerv-data-value green" id="nerv-pattern">BLUE: NEG</span>
          </div>
          <div class="nerv-data-item">
            <span class="nerv-data-label">ALERT LVL</span>
            <span class="nerv-data-value" id="nerv-alert-level">STANDBY</span>
          </div>
        </div>
 
        <div class="nerv-header-right">
          <div>
            <div class="nerv-date" id="nerv-date">AD 2015-09-13</div>
            <div class="nerv-time" id="nerv-time">00:00:00</div>
          </div>
        </div>
      </div>
 
      <!-- LEFT PANEL -->
      <div id="nerv-panel-left">
 
        <!-- Sync Ratio Panel -->
        <div class="nerv-panel nerv-panel-tl">
          <div class="nerv-panel-title">▶ SYNCHRONIZATION</div>
          <div class="nerv-sync-display">
            <span class="nerv-sync-number" id="nerv-sync">00</span><span class="nerv-sync-unit">%</span>
            <span class="nerv-sync-label">SYNC RATIO</span>
          </div>
          <div class="nerv-bar-container">
            <div class="nerv-bar-row">
              <span class="nerv-bar-label">L·ARM</span>
              <div class="nerv-bar-track"><div class="nerv-bar-fill orange" id="nerv-bar-larm" style="width:85%"></div></div>
              <span class="nerv-bar-val" id="nerv-val-larm">85</span>
            </div>
            <div class="nerv-bar-row">
              <span class="nerv-bar-label">R·ARM</span>
              <div class="nerv-bar-track"><div class="nerv-bar-fill orange" id="nerv-bar-rarm" style="width:82%"></div></div>
              <span class="nerv-bar-val" id="nerv-val-rarm">82</span>
            </div>
            <div class="nerv-bar-row">
              <span class="nerv-bar-label">CORE</span>
              <div class="nerv-bar-track"><div class="nerv-bar-fill green" id="nerv-bar-core" style="width:91%"></div></div>
              <span class="nerv-bar-val" id="nerv-val-core">91</span>
            </div>
            <div class="nerv-bar-row">
              <span class="nerv-bar-label">A·FIELD</span>
              <div class="nerv-bar-track"><div class="nerv-bar-fill yellow" id="nerv-bar-af" style="width:45%"></div></div>
              <span class="nerv-bar-val" id="nerv-val-af">45</span>
            </div>
          </div>
        </div>
 
        <!-- Unit Status Panel -->
        <div class="nerv-panel nerv-panel-bl">
          <div class="nerv-panel-title">▶ UNIT-01 STATUS</div>
          <div class="nerv-status-list">
            <div class="nerv-status-row">
              <span class="nerv-status-name">NEURAL LINK</span>
              <span class="nerv-status-val ok" id="st-neural">ACTIVE</span>
            </div>
            <div class="nerv-status-row">
              <span class="nerv-status-name">LCL PRESSURE</span>
              <span class="nerv-status-val ok">NOMINAL</span>
            </div>
            <div class="nerv-status-row">
              <span class="nerv-status-name">POWER SUPPLY</span>
              <span class="nerv-status-val ok" id="st-power">INTERNAL</span>
            </div>
            <div class="nerv-status-row">
              <span class="nerv-status-name">AT FIELD</span>
              <span class="nerv-status-val active" id="st-atfield">DEPLOYED</span>
            </div>
            <div class="nerv-status-row">
              <span class="nerv-status-name">PROG KNIFE</span>
              <span class="nerv-status-val ok">STOWED</span>
            </div>
            <div class="nerv-status-row">
              <span class="nerv-status-name">CORE TEMP</span>
              <span class="nerv-status-val ok" id="st-temp">36.6°C</span>
            </div>
          </div>
        </div>
 
      </div>
 
      <!-- RIGHT PANEL -->
      <div id="nerv-panel-right">
 
        <!-- Threat Scanner -->
        <div class="nerv-panel nerv-panel-tr">
          <div class="nerv-panel-title">▶ ANGEL SCAN // TACTICAL</div>
          <div class="nerv-threat-display">
            <div class="nerv-threat-ring">
              <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(107,0,107,0.4)" stroke-width="0.5"/>
                <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(107,0,107,0.6)" stroke-width="0.5" stroke-dasharray="4 4"/>
                <circle cx="40" cy="40" r="20" fill="none" stroke="rgba(107,0,107,0.5)" stroke-width="0.5"/>
                <circle cx="40" cy="40" r="12" fill="none" stroke="rgba(255,102,0,0.4)" stroke-width="0.5"/>
                <line x1="40" y1="4" x2="40" y2="76" stroke="rgba(107,0,107,0.3)" stroke-width="0.5"/>
                <line x1="4" y1="40" x2="76" y2="40" stroke="rgba(107,0,107,0.3)" stroke-width="0.5"/>
                <polygon points="40,6 43,12 40,11 37,12" fill="rgba(255,102,0,0.6)" stroke="none"/>
              </svg>
              <div class="nerv-threat-center">
                <span class="nerv-threat-level" id="nerv-threat">CLEAR</span>
                <span class="nerv-threat-text">ANGEL SCAN</span>
              </div>
            </div>
          </div>
          <div class="nerv-hex-grid">
            <div class="nerv-hex"><span class="nerv-hex-val" id="hex-0">A4F2</span><span class="nerv-hex-label">SIG</span></div>
            <div class="nerv-hex"><span class="nerv-hex-val" id="hex-1">3C1A</span><span class="nerv-hex-label">PAT</span></div>
            <div class="nerv-hex"><span class="nerv-hex-val" id="hex-2">FF00</span><span class="nerv-hex-label">SRC</span></div>
            <div class="nerv-hex"><span class="nerv-hex-val" id="hex-3">0044</span><span class="nerv-hex-label">AMP</span></div>
            <div class="nerv-hex"><span class="nerv-hex-val" id="hex-4">B7E3</span><span class="nerv-hex-label">LOC</span></div>
            <div class="nerv-hex"><span class="nerv-hex-val" id="hex-5">29FF</span><span class="nerv-hex-label">VEC</span></div>
            <div class="nerv-hex"><span class="nerv-hex-val" id="hex-6">8A0C</span><span class="nerv-hex-label">MAG</span></div>
            <div class="nerv-hex"><span class="nerv-hex-val" id="hex-7">1D3E</span><span class="nerv-hex-label">TRK</span></div>
          </div>
        </div>
 
        <!-- Mission Log -->
        <div class="nerv-panel nerv-panel-br">
          <div class="nerv-panel-title">▶ OPERATIONS LOG</div>
          <div class="nerv-log" id="nerv-log">
            <div class="nerv-log-line ok"><span>▶</span><span>MAGI SYSTEM INITIALIZED</span></div>
            <div class="nerv-log-line"><span>▶</span><span>UNIT-01 NEURAL CONNECT</span></div>
            <div class="nerv-log-line ok"><span>▶</span><span>SYNC RATIO NOMINAL</span></div>
            <div class="nerv-log-line"><span>▶</span><span>ALL SYSTEMS OPERATIONAL</span></div>
            <div class="nerv-log-line"><span>▶</span><span>STANDBY FOR DEPLOYMENT<span style="display:inline-block;width:5px;height:9px;background:#00FF41;margin-left:3px;animation:eva-blink 1s step-end infinite;vertical-align:middle"></span></span></div>
          </div>
        </div>
 
      </div>
 
      <!-- FOOTER BAR -->
      <div id="nerv-footer">
        <div class="nerv-ticker">
          <div class="nerv-ticker-inner">
            ${nervMessages}
            ${nervMessages}
          </div>
        </div>
        <div class="nerv-footer-stats">
          <div class="nerv-footer-stat">
            <span class="nerv-footer-stat-label">PILOTS</span>
            <span class="nerv-footer-stat-val">03</span>
          </div>
          <div class="nerv-footer-stat">
            <span class="nerv-footer-stat-label">UNITS</span>
            <span class="nerv-footer-stat-val">05</span>
          </div>
          <div class="nerv-footer-stat">
            <span class="nerv-footer-stat-label">ANGELS</span>
            <span class="nerv-footer-stat-val" id="nerv-angel-count">17</span>
          </div>
          <div class="nerv-footer-stat">
            <span class="nerv-footer-stat-label">DEFEATED</span>
            <span class="nerv-footer-stat-val" id="nerv-defeated">14</span>
          </div>
        </div>
      </div>
 
      <!-- Crosshair -->
      <div id="nerv-crosshair">
        <svg class="nerv-crosshair-svg" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,102,0,0.6)" stroke-width="0.5"/>
          <circle cx="20" cy="20" r="12" fill="none" stroke="rgba(255,102,0,0.4)" stroke-width="0.5" stroke-dasharray="3 3"/>
          <circle cx="20" cy="20" r="3" fill="rgba(255,102,0,0.8)"/>
          <line x1="20" y1="2" x2="20" y2="38" stroke="rgba(255,102,0,0.4)" stroke-width="0.5"/>
          <line x1="2" y1="20" x2="38" y2="20" stroke="rgba(255,102,0,0.4)" stroke-width="0.5"/>
          <polygon points="20,2 21.5,6 20,5 18.5,6" fill="rgba(255,102,0,0.8)"/>
        </svg>
      </div>
    `;
  }
 
  function getTickerMessages() {
    const items = [
      ['NERV SPECIAL AGENCY // GEOFRONT HEADQUARTERS', 'highlight'],
      ['EVANGELION UNIT-01 OPERATIONAL STATUS: ACTIVE', ''],
      ['MAGI-01 CASPAR: ONLINE', ''],
      ['MAGI-02 BALTHASAR: ONLINE', ''],
      ['MAGI-03 MELCHIOR: ONLINE', ''],
      ['AT FIELD NEUTRALIZATION PROTOCOL: READY', ''],
      ['CLASSIFIED: DEAD SEA SCROLLS REFERENCE 04-A', ''],
      ['PATTERN BLUE SCAN: NEGATIVE CONTACT', ''],
      ['LANCE OF LONGINUS: LOCATION UNKNOWN', 'highlight'],
      ['SEELE COUNCIL: MONITORING', ''],
      ['PILOT SYNC RATIO EXCEEDS THRESHOLD', ''],
      ['THIRD IMPACT PREVENTION ACTIVE', 'highlight'],
      ['ALL EVANGELION UNITS AT READINESS', ''],
      ['UMBILICAL CABLE CONNECTION: STABLE', ''],
    ];
    return items.map(([text, cls]) =>
      `<span class="nerv-ticker-item ${cls}">▶ ${text}</span>`
    ).join('');
  }
 
  function startClock() {
    const update = () => {
      const now = new Date();
      const timeEl = document.getElementById('nerv-time');
      const dateEl = document.getElementById('nerv-date');
      if (timeEl) {
        timeEl.textContent = now.toTimeString().slice(0, 8);
      }
      if (dateEl) {
        const y = 2015; // Eva year
        const mo = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        dateEl.textContent = `AD ${y}-${mo}-${d}`;
      }
    };
    update();
    clockInterval = setInterval(update, 1000);
  }
 
  function startStats() {
    const animateNumber = (id, min, max, isBar) => {
      const el = document.getElementById(id);
      if (!el) return;
      const val = Math.floor(Math.random() * (max - min) + min);
      el.textContent = val;
      if (isBar) {
        const barId = id.replace('nerv-val-', 'nerv-bar-');
        const barEl = document.getElementById(barId);
        if (barEl) barEl.style.width = val + '%';
      }
    };
 
    const updateSync = () => {
      const sync = Math.floor(Math.random() * 25) + 70;
      const el = document.getElementById('nerv-sync');
      if (el) {
        let curr = parseInt(el.textContent) || 0;
        const step = () => {
          if (Math.abs(curr - sync) > 1) {
            curr += curr < sync ? 1 : -1;
            el.textContent = String(curr).padStart(2, '0');
            setTimeout(step, 50);
          }
        };
        step();
      }
    };
 
    const updateHex = () => {
      for (let i = 0; i < 8; i++) {
        const el = document.getElementById(`hex-${i}`);
        if (el) {
          el.textContent = Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
        }
      }
    };
 
    const updateBars = () => {
      animateNumber('nerv-val-larm', 75, 95, true);
      animateNumber('nerv-val-rarm', 72, 92, true);
      animateNumber('nerv-val-core', 85, 98, true);
      animateNumber('nerv-val-af', 30, 65, true);
    };
 
    updateSync();
    updateBars();
    updateHex();
 
    statsInterval = setInterval(() => {
      updateSync();
      updateBars();
      updateHex();
    }, 4000);
  }
 
  const logMessages = [
    ['NEURAL INTERFACE: CALIBRATED', ''],
    ['PATTERN BLUE: NEGATIVE', 'ok'],
    ['POSITRON RIFLE: CHARGED', 'ok'],
    ['CORE TEMPERATURE: STABLE', ''],
    ['LCL INJECTION: COMPLETE', 'ok'],
    ['AT FIELD STRENGTH: 72%', ''],
    ['WARNING: UMBILICAL STRESS', 'warn'],
    ['ANGEL APPROACH VECTOR: NONE', 'ok'],
    ['SEELE OVERRIDE: BLOCKED', 'warn'],
    ['SYNC RATIO FLUCTUATION', 'warn'],
    ['BERSERK MODE: SUPPRESSED', 'warn'],
    ['CORE BREACH RISK: LOW', ''],
    ['RESTRAINT BOLTS: SECURE', 'ok'],
    ['PILOT VITALS: NOMINAL', 'ok'],
  ];
 
  let logIdx = 0;
 
  function startLog() {
    logInterval = setInterval(() => {
      const logEl = document.getElementById('nerv-log');
      if (!logEl) return;
 
      const msg = logMessages[logIdx % logMessages.length];
      logIdx++;
 
      const line = document.createElement('div');
      line.className = `nerv-log-line ${msg[1]}`;
      line.innerHTML = `<span>▶</span><span>${msg[0]}</span>`;
      logEl.appendChild(line);
 
      while (logEl.children.length > 7) {
        logEl.removeChild(logEl.children[0]);
      }
    }, 2500);
  }
 
  function setupCrosshair() {
    const crosshair = document.getElementById('nerv-crosshair');
    if (!crosshair) return;
 
    let moveTimeout;
 
    const onMouseMove = (e) => {
      crosshair.style.left = e.clientX + 'px';
      crosshair.style.top = e.clientY + 'px';
      crosshair.classList.add('visible');
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => crosshair.classList.remove('visible'), 3000);
    };
 
    document.addEventListener('mousemove', onMouseMove);
    crosshair._cleanup = () => document.removeEventListener('mousemove', onMouseMove);
  }
 
  
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'nerv-close-btn') {
      deactivateHUD();
    }
  });
 
})();