(function () {
  // Configuration - set your server URL here
  const API_URL = window.YOYO_API_URL || "http://localhost:3000/api/updates";

  // ---- Style ----
  const style = document.createElement("style");
  style.innerHTML = `
    #yoyoBell {
      position: fixed;
      bottom: 25px;
      right: 25px;
      height: 50px;
      width: 50px;
      background: #ffcc00;
      color: #000;
      font-size: 24px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      box-shadow: 0 4px 12px rgba(0,0,0,.3);
      transition: transform 0.2s;
    }
    #yoyoBell:hover {
      transform: scale(1.1);
    }
    #yoyoBox {
      position: fixed;
      bottom: 90px;
      right: 25px;
      width: 330px;
      max-height: 420px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,.4);
      z-index: 99999;
      padding: 16px;
      overflow-y: auto;
      display: none;
      font-family: sans-serif;
    }
    #yoyoBox h2 {
      margin: 0 0 10px;
      font-size: 18px;
      font-weight: 700;
    }
    .yoyoItem {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .yoyoItem:last-child {
      border: none;
    }
    .yoyoTitle {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 4px;
    }
    .yoyoMsg {
      opacity: .8;
      font-size: 14px;
      color: #666;
    }
    #yoyoClose {
      float: right;
      cursor: pointer;
      font-size: 18px;
      margin-top: -6px;
      color: #999;
    }
    #yoyoClose:hover {
      color: #000;
    }
  `;
  document.head.appendChild(style);

  // ---- Create elements ----
  const bell = document.createElement("div");
  bell.id = "yoyoBell";
  bell.innerHTML = "🔔";
  document.body.appendChild(bell);

  const box = document.createElement("div");
  box.id = "yoyoBox";
  box.innerHTML = `<h2>Updates <span id="yoyoClose">✖</span></h2><div id="yoyoList">Loading...</div>`;
  document.body.appendChild(box);

  // ---- Toggle popup ----
  bell.onclick = () => {
    box.style.display = box.style.display === "none" ? "block" : "none";
  };

  document.addEventListener("click", (e) => {
    if (e.target.id === "yoyoClose") {
      box.style.display = "none";
    }
    // Close when clicking outside
    if (!box.contains(e.target) && !bell.contains(e.target) && box.style.display === "block") {
      box.style.display = "none";
    }
  });

  // ---- Fetch Updates from your API ----
  fetch(API_URL)
    .then((r) => r.json())
    .then((data) => {
      const list = document.querySelector("#yoyoList");
      if (data && data.length > 0) {
        list.innerHTML = data
          .map(
            (u) => `
          <div class="yoyoItem">
            <div class="yoyoTitle">${escapeHtml(u.title)}</div>
            <div class="yoyoMsg">${escapeHtml(u.content)}</div>
          </div>
        `
          )
          .join("");
      } else {
        list.innerHTML = "<p style='opacity:0.6;'>No updates yet</p>";
      }
    })
    .catch((err) => {
      console.error("Failed to load updates:", err);
      document.querySelector("#yoyoList").innerHTML =
        "<p style='color:red;'>Failed to load updates</p>";
    });

  // Helper to escape HTML
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
