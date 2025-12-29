/* ============ YOYO WIDGET v2 (Beamer-Like, Global Compatible) ============ */

(function () {

  const API = "https://yoyo-liart.vercel.app/api/updates"; // LIVE API ONLY



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



    // ---------- Create Styles ----------

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

    document.head.appendChild(css);



    // ---------- Create UI ----------

    const bell=document.createElement("div");

    bell.id="yoyoBell";

    bell.innerHTML="🔔";



    const box=document.createElement("div");

    box.id="yoyoBox";

    box.innerHTML="<h2>Updates</h2><p>Loading...</p>";



    document.body.appendChild(bell);

    document.body.appendChild(box);



    async function loadUpdates(){

      try{

        const r=await fetch(API);

        if(!r.ok) throw new Error('API error');

        const data=await r.json();



        if(!data || !data.length){

          box.innerHTML="<h2>Updates</h2><p>No updates yet.</p>";

          return;

        }



        // Escape HTML to prevent XSS

        function escapeHtml(text){

          const div=document.createElement('div');

          div.textContent=text;

          return div.innerHTML;

        }



        box.innerHTML="<h2>Updates</h2>" +

        data.map(x=>`<div class='yoyoItem'><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.content)}</p></div>`).join("");

      }

      catch(e){ 

        console.error('Yoyo widget error:', e);

        box.innerHTML="<h2>Updates</h2><p>Failed to load.</p>"; 

      }

    }



    bell.onclick=()=>{ 

      box.style.display = box.style.display=="none" ? "block" : "none";

      if(box.style.display=="block") loadUpdates();

    };

  }



  // Start initialization

  if (document.readyState === 'complete' || document.readyState === 'interactive') {

    setTimeout(init, 1);

  } else {

    window.addEventListener('load', init);

    document.addEventListener('DOMContentLoaded', init);

  }

})();
