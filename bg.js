chrome.action.onClicked.addListener(function(tab) {
  if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) return;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: function() {

      if (document.getElementById('nerv-hud')) {
        ['nerv-hud','nerv-css'].forEach(function(id){ var e=document.getElementById(id); if(e) e.remove(); });
        clearInterval(window.__nhI); clearInterval(window.__nhL); clearInterval(window.__nhC);
        return;
      }

      var css = document.createElement('style');
      css.id = 'nerv-css';
      css.textContent = `
        #nerv-hud{position:fixed;inset:0;z-index:2147483647;pointer-events:none;font-family:monospace;}
        #nerv-hud::before{content:"";position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.1) 3px,rgba(0,0,0,0.1) 6px);pointer-events:none;z-index:1;}
        #nerv-hud::after{content:"";position:fixed;inset:0;background:radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,0.5) 100%);pointer-events:none;z-index:1;}
        #nh-top{position:fixed;top:0;left:0;right:0;height:44px;background:rgba(5,0,9,0.97);border-bottom:2px solid #FF6600;display:flex;align-items:center;padding:0 14px;gap:14px;z-index:100;animation:nhD .5s ease;}
        #nh-bot{position:fixed;bottom:0;left:0;right:0;height:34px;background:rgba(5,0,9,0.97);border-top:2px solid #FF6600;display:flex;align-items:center;overflow:hidden;z-index:100;animation:nhU .5s ease;}
        #nh-lft{position:fixed;top:52px;left:8px;width:185px;display:flex;flex-direction:column;gap:6px;z-index:100;animation:nhL .6s .1s both ease;}
        #nh-rgt{position:fixed;top:52px;right:8px;width:185px;display:flex;flex-direction:column;gap:6px;z-index:100;animation:nhR .6s .1s both ease;}
        @keyframes nhD{from{transform:translateY(-100%)}to{transform:translateY(0)}}
        @keyframes nhU{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes nhL{from{transform:translateX(-120%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes nhR{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}
        .nhP{background:rgba(8,0,13,0.95);border:1px solid #550055;padding:8px;}
        .nhPA{clip-path:polygon(0 0,calc(100% - 11px) 0,100% 11px,100% 100%,0 100%);}
        .nhPB{clip-path:polygon(0 0,100% 0,100% 100%,11px 100%,0 calc(100% - 11px));}
        .nhPC{clip-path:polygon(11px 0,100% 0,100% 100%,0 100%,0 11px);}
        .nhPD{clip-path:polygon(0 0,100% 0,100% calc(100% - 11px),calc(100% - 11px) 100%,0 100%);}
        .nhT{font-size:7px;font-weight:700;color:#FF6600;letter-spacing:3px;border-bottom:1px solid #330033;padding-bottom:5px;margin-bottom:6px;}
        .nhBR{font-size:40px;font-weight:900;color:#FF6600;text-shadow:0 0 15px rgba(255,102,0,.8);}
        .nhBL{font-size:7px;color:#553355;letter-spacing:3px;display:block;margin-top:2px;}
        .nhRow{display:flex;align-items:center;gap:4px;margin-bottom:3px;}
        .nhRL{font-size:6px;color:#553355;width:30px;text-align:right;flex-shrink:0;}
        .nhTR{flex:1;height:3px;background:#160010;border:1px solid #330033;overflow:hidden;}
        .nhFO{height:100%;background:linear-gradient(90deg,#CC4400,#FF6600);}
        .nhFG{height:100%;background:linear-gradient(90deg,#004400,#00FF41);}
        .nhFY{height:100%;background:linear-gradient(90deg,#664400,#FFD700);}
        .nhRV{font-size:6px;color:#FF6600;width:18px;flex-shrink:0;}
        .nhSR{display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid rgba(40,0,40,.5);}
        .nhSN{font-size:7px;color:#664466;}
        .nhSV{font-size:7px;font-weight:700;letter-spacing:1px;}
        .co{color:#00FF41;text-shadow:0 0 4px #00FF41;}
        .ca{color:#FF6600;text-shadow:0 0 4px #FF6600;}
        .cw{color:#FFD700;text-shadow:0 0 4px #FFD700;animation:blnk .7s step-end infinite;}
        @keyframes blnk{0%,100%{opacity:1}50%{opacity:0}}
        .nhHB{font-size:13px;font-weight:900;color:#FF6600;letter-spacing:3px;text-shadow:0 0 10px rgba(255,102,0,.8);}
        .nhHD{display:flex;gap:14px;}
        .nhHI{display:flex;flex-direction:column;}
        .nhHL_{font-size:6px;color:#442244;letter-spacing:2px;}
        .nhHV_{font-size:10px;font-weight:700;color:#FF6600;}
        .nhHVG{color:#00FF41;}
        .nhTM{font-size:12px;font-weight:700;color:#FF6600;margin-left:auto;}
        .nhLG{font-size:7px;line-height:2;max-height:90px;overflow:hidden;}
        .nhLL{display:flex;gap:4px;color:#553355;}
        .nhLO{color:#00FF41;}
        .nhLW{color:#FFD700;}
        .nhHX{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:5px;}
        .nhHC{background:#0A0014;border:1px solid #330033;padding:3px 2px;text-align:center;}
        .nhHV2{font-size:6px;color:#664466;display:block;}
        .nhHL2{font-size:5px;color:#332233;display:block;}
        .nhTK{white-space:nowrap;font-size:7px;color:#553355;animation:tick 30s linear infinite;display:inline-block;padding-left:100vw;}
        @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-200%)}}
        .nhRD{animation:spin 4s linear infinite;transform-origin:50px 50px;}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        #nh-x{position:fixed;top:9px;right:12px;z-index:2147483647;pointer-events:all!important;cursor:pointer;background:rgba(8,0,12,.95);border:1px solid #CC0000;color:#CC0000;font-family:monospace;font-size:9px;letter-spacing:2px;padding:5px 12px;}
        #nh-x:hover{background:rgba(150,0,0,.3);}
      `;
      document.head.appendChild(css);

      var hud = document.createElement('div');
      hud.id = 'nerv-hud';
      hud.innerHTML = `
        <button id="nh-x" onclick="(function(){['nerv-hud','nerv-css'].forEach(function(id){var e=document.getElementById(id);if(e)e.remove();});clearInterval(window.__nhI);clearInterval(window.__nhL);clearInterval(window.__nhC);})()">× TERMINATE</button>

        <div id="nh-top">
          <svg width="24" height="24" viewBox="0 0 24 24" style="flex-shrink:0">
            <polygon points="12,2 22,21 2,21" fill="none" stroke="#FF6600" stroke-width="1.5"/>
            <circle cx="12" cy="14" r="3.5" fill="#FF6600" opacity=".9"/>
            <circle cx="12" cy="14" r="1.8" fill="#FF3300"/>
          </svg>
          <span class="nhHB">NERV</span>
          <div class="nhHD">
            <div class="nhHI"><span class="nhHL_">PILOT</span><span class="nhHV_">IKARI·S</span></div>
            <div class="nhHI"><span class="nhHL_">UNIT</span><span class="nhHV_">EVA-01</span></div>
            <div class="nhHI"><span class="nhHL_">MAGI</span><span class="nhHV_ nhHVG">3/3 OK</span></div>
            <div class="nhHI"><span class="nhHL_">PATTERN</span><span class="nhHV_ nhHVG">BLUE:NEG</span></div>
          </div>
          <span class="nhTM" id="nh-tm">00:00:00</span>
        </div>

        <div id="nh-lft">
          <div class="nhP nhPA">
            <div class="nhT">▶ SYNCHRONIZATION</div>
            <div style="text-align:center;padding:3px 0">
              <span class="nhBR" id="nh-sy">00</span><span style="font-size:13px;color:#664466">%</span>
              <span class="nhBL">SYNC RATIO</span>
            </div>
            <div style="margin-top:5px">
              <div class="nhRow"><span class="nhRL">L·ARM</span><div class="nhTR"><div class="nhFO" id="nb1" style="width:85%"></div></div><span class="nhRV" id="nv1">85</span></div>
              <div class="nhRow"><span class="nhRL">R·ARM</span><div class="nhTR"><div class="nhFO" id="nb2" style="width:82%"></div></div><span class="nhRV" id="nv2">82</span></div>
              <div class="nhRow"><span class="nhRL">CORE</span><div class="nhTR"><div class="nhFG" id="nb3" style="width:91%"></div></div><span class="nhRV" id="nv3">91</span></div>
              <div class="nhRow"><span class="nhRL">A·FLD</span><div class="nhTR"><div class="nhFY" id="nb4" style="width:44%"></div></div><span class="nhRV" id="nv4">44</span></div>
            </div>
          </div>
          <div class="nhP nhPB">
            <div class="nhT">▶ UNIT-01 STATUS</div>
            <div class="nhSR"><span class="nhSN">NEURAL LINK</span><span class="nhSV co">ACTIVE</span></div>
            <div class="nhSR"><span class="nhSN">LCL PRESSURE</span><span class="nhSV co">NOMINAL</span></div>
            <div class="nhSR"><span class="nhSN">POWER</span><span class="nhSV co">INTERNAL</span></div>
            <div class="nhSR"><span class="nhSN">AT FIELD</span><span class="nhSV ca">DEPLOYED</span></div>
            <div class="nhSR"><span class="nhSN">CORE TEMP</span><span class="nhSV co">36.6°C</span></div>
            <div class="nhSR"><span class="nhSN">UMBILICAL</span><span class="nhSV cw">STRESS</span></div>
          </div>
        </div>

        <div id="nh-rgt">
          <div class="nhP nhPC">
            <div class="nhT">▶ ANGEL SCAN</div>
            <div style="display:flex;justify-content:center;padding:3px 0">
              <svg width="96" height="96" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(107,0,107,.4)" stroke-width=".5"/>
                <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(107,0,107,.5)" stroke-width=".5" stroke-dasharray="4 3"/>
                <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(107,0,107,.4)" stroke-width=".5"/>
                <line x1="50" y1="4" x2="50" y2="96" stroke="rgba(107,0,107,.2)" stroke-width=".5"/>
                <line x1="4" y1="50" x2="96" y2="50" stroke="rgba(107,0,107,.2)" stroke-width=".5"/>
                <g class="nhRD">
                  <line x1="50" y1="50" x2="50" y2="4" stroke="rgba(0,255,65,.5)" stroke-width="1"/>
                  <path d="M50 50 L50 4 A46 46 0 0 1 90 66 Z" fill="rgba(0,255,65,.06)" stroke="none"/>
                </g>
                <circle cx="50" cy="50" r="3" fill="#FF6600"/>
              </svg>
            </div>
            <div class="nhHX">
              <div class="nhHC"><span class="nhHV2" id="hx0">A4F2</span><span class="nhHL2">SIG</span></div>
              <div class="nhHC"><span class="nhHV2" id="hx1">3C1A</span><span class="nhHL2">PAT</span></div>
              <div class="nhHC"><span class="nhHV2" id="hx2">FF00</span><span class="nhHL2">SRC</span></div>
              <div class="nhHC"><span class="nhHV2" id="hx3">0044</span><span class="nhHL2">AMP</span></div>
              <div class="nhHC"><span class="nhHV2" id="hx4">B7E3</span><span class="nhHL2">LOC</span></div>
              <div class="nhHC"><span class="nhHV2" id="hx5">29FF</span><span class="nhHL2">VEC</span></div>
              <div class="nhHC"><span class="nhHV2" id="hx6">8A0C</span><span class="nhHL2">MAG</span></div>
              <div class="nhHC"><span class="nhHV2" id="hx7">1D3E</span><span class="nhHL2">TRK</span></div>
            </div>
          </div>
          <div class="nhP nhPD">
            <div class="nhT">▶ OPS LOG</div>
            <div class="nhLG" id="nh-log">
              <div class="nhLL nhLO"><span>▶</span><span>MAGI INITIALIZED</span></div>
              <div class="nhLL"><span>▶</span><span>UNIT-01 LINKED</span></div>
              <div class="nhLL nhLO"><span>▶</span><span>SYNC NOMINAL</span></div>
              <div class="nhLL nhLW"><span>▶</span><span>STANDBY MODE</span></div>
            </div>
          </div>
        </div>

        <div id="nh-bot">
          <span class="nhTK">
            ▶ NERV SPECIAL AGENCY // GEOFRONT HQ // CLASSIFIED &nbsp;&nbsp;
            EVANGELION UNIT-01 OPERATIONAL &nbsp;&nbsp;
            ▶ PATTERN BLUE: NEGATIVE &nbsp;&nbsp;
            MAGI 3/3 ONLINE &nbsp;&nbsp;
            ▶ GOD'S IN HIS HEAVEN — ALL'S RIGHT WITH THE WORLD &nbsp;&nbsp;
          </span>
        </div>
      `;
      document.body.appendChild(hud);

      function nhC(){var e=document.getElementById('nh-tm');if(e)e.textContent=new Date().toTimeString().slice(0,8);}
      nhC(); window.__nhC=setInterval(nhC,1000);

      function nhU(){
        var sync=Math.floor(Math.random()*22+70);
        var se=document.getElementById('nh-sy');
        if(se){var c=parseInt(se.textContent)||0;var s=function(){if(Math.abs(c-sync)>1){c+=c<sync?1:-1;se.textContent=String(c).padStart(2,'0');setTimeout(s,40);}};s();}
        [['nb1','nv1',75,95],['nb2','nv2',72,92],['nb3','nv3',85,98],['nb4','nv4',30,62]].forEach(function(x){
          var v=Math.floor(Math.random()*(x[3]-x[2])+x[2]);
          var b=document.getElementById(x[0]),vv=document.getElementById(x[1]);
          if(b)b.style.width=v+'%';if(vv)vv.textContent=v;
        });
        for(var i=0;i<8;i++){var e=document.getElementById('hx'+i);if(e)e.textContent=Math.floor(Math.random()*0xFFFF).toString(16).toUpperCase().padStart(4,'0');}
      }
      nhU(); window.__nhI=setInterval(nhU,4000);

      var msgs=[['NEURAL CALIBRATED','nhLO'],['PATTERN BLUE: NEG','nhLO'],['LCL NOMINAL','nhLO'],['SYNC FLUCTUATION','nhLW'],['ANGEL SCAN CLEAR','nhLO'],['UMBILICAL STRESS','nhLW']];
      var li=0;
      window.__nhL=setInterval(function(){
        var log=document.getElementById('nh-log');if(!log)return;
        var m=msgs[li%msgs.length];li++;
        var d=document.createElement('div');
        d.className='nhLL '+m[1];d.innerHTML='<span>▶</span><span>'+m[0]+'</span>';
        log.appendChild(d);
        while(log.children.length>6)log.removeChild(log.children[0]);
      },2500);
    }
  });
});
