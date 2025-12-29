/* ============ YOYO WIDGET v2 (Beamer-Like, Global Compatible) ============ */
(function () {
  'use strict';
  
  const API_URL = window.YOYO_API_URL || "https://yoyo-liart.vercel.app/api/updates";
  
  // Wait for DOM to be ready
  function init() {
    if (!document.body) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
      } else {
        setTimeout(init, 100);
        return;
      }
    }
    
    // Check if already initialized
    if (document.getElementById('yoyoBell')) return;
    
    // Create Styles
    const css = document.createElement("style");
    css.innerHTML = `
      #yoyoBell{
        position:fixed; bottom:25px; right:25px;
        background:#ffcc00; color:#000; width:55px; height:55px;
        border-radius:50%; display:flex; align-items:center; justify-content:center;
        font-size:26px; font-weight:700; cursor:pointer; z-index:99999;
        box-shadow:0 4px 14px rgba(0,0,0,.3); transition:.2s;
      }
      #yoyoBell:hover{ transform:scale(1.12); }
      #yoyoBox{
        position:fixed; bottom:95px; right:25px; width:330px;
        max-height:400px; background:#fff; border-radius:10px;
        box-shadow:0 4px 25px rgba(0,0,0,.25); overflow-y:auto;
        padding:15px; font-family:sans-serif; display:none; z-index:999999;
      }
      #yoyoBox h2{ margin:0 0 10px;font-size:18px;font-weight:700;color:#111; }
      .yoyoItem{border-bottom:1px solid #eee;padding:10px 0;}
      .yoyoItem:last-child{border-bottom:none;}
      .yoyoItem h3{margin:0;font-size:15px;font-weight:600;color:#000;}
      .yoyoItem p{margin:6px 0 0;font-size:13px;color:#444;line-height:1.4;}
    `;
    
    if (document.head) {
      document.head.appendChild(css);
    } else {
      setTimeout(function() {
        if (document.head) document.head.appendChild(css);
      }, 50);
    }
    
    // Create UI
    const bell = document.createElement("div");
    bell.id = "yoyoBell";
    bell.innerHTML = "🔔";
    
    const box = document.createElement("div");
    box.id = "yoyoBox";
    box.innerHTML = "<h2>Updates</h2><p>Loading...</p>";
    
    document.body.appendChild(bell);
    document.body.appendChild(box);
    
    // Escape HTML helper
    function escapeHtml(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.textContent = String(text);
      return div.innerHTML;
    }
    
    // Load updates
    async function loadUpdates() {
      box.innerHTML = "<h2>Updates</h2><p>Loading...</p>";
      
      try {
        const r = await fetch(API_URL, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-cache',
          mode: 'cors'
        });
        
        if (!r.ok) {
          // If API returns error, show empty state
          box.innerHTML = "<h2>Updates</h2><p>No updates yet.</p>";
          return;
        }
        
        const data = await r.json();
        
        // Handle both array and object responses
        const updates = Array.isArray(data) ? data : (data.updates || []);
        
        if (!updates || !updates.length) {
          box.innerHTML = "<h2>Updates</h2><p>No updates yet.</p>";
          return;
        }
        
        box.innerHTML = "<h2>Updates</h2>" + 
          updates.map(function(x) {
            if (!x || !x.title) return '';
            return '<div class="yoyoItem"><h3>' + escapeHtml(x.title) + '</h3><p>' + escapeHtml(x.content || '') + '</p></div>';
          }).filter(function(x) { return x !== ''; }).join("");
      } catch(e) {
        console.error('Yoyo widget error:', e);
        // Show user-friendly message instead of "Failed to load"
        box.innerHTML = "<h2>Updates</h2><p>No updates available at the moment.</p>";
      }
    }
    
    // Click handler
    bell.onclick = function() {
      var isVisible = box.style.display !== "none";
      box.style.display = isVisible ? "none" : "block";
      if (!isVisible) loadUpdates();
    };
  }
  
  // Start initialization - multiple fallbacks
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 1);
  } else {
    if (window.addEventListener) {
      window.addEventListener('load', init);
      document.addEventListener('DOMContentLoaded', init);
    } else if (window.attachEvent) {
      window.attachEvent('onload', init);
    } else {
      setTimeout(init, 1000);
    }
  }
})();
